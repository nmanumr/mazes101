import ts from "typescript";

export default function keyTransformer(program) {
  return (context) => {
    function visit(node) {
      node = ts.visitEachChild(node, visit, context);

      const typeChecker = program.getTypeChecker();
      if (ts.isImportDeclaration(node)) {
        return handleImportExpression(node);
      }
      if (!isKeysCallExpression(node, typeChecker)) {
        return node;
      }
      if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
      }
      const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
      const properties = typeChecker.getPropertiesOfType(type);
      return ts.createArrayLiteral(properties.map(property => ts.createLiteral(property.name)));

    }

    return (node) => ts.visitNode(node, visit);
  }
}

function handleImportExpression(node) {
  const module = node.moduleSpecifier.text;
  if (module === 'ts-transformer-keys') {
    return;
  }
  let resolvedModule = node.parent.resolvedModules.get(module);
  if (resolvedModule.isExternalLibraryImport) return node;

  let newModule = `${module}${resolvedModule.extension}`
  if (resolvedModule.resolvedFileName.endsWith(`/index${resolvedModule.extension}`)) {
    newModule = `${module}/index${resolvedModule.extension}`
  }

  return ts.factory.createImportDeclaration(
      node.decorators,
      node.modifiers,
      node.importClause,
      ts.factory.createStringLiteral(newModule)
  );
}

function isKeysCallExpression(node, typeChecker) {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const declaration = typeChecker.getResolvedSignature(node)?.declaration;

  if (!declaration || ts.isJSDocSignature(declaration) || declaration.name?.getText() !== 'keys') {
    return false;
  }
  try {
    return declaration.getSourceFile().fileName.endsWith('ts-transformer-keys/index.d.ts');
  } catch {
    return false;
  }
}
