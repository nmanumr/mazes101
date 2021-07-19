import math
import re
import json


camel_pat = re.compile(r'([A-Z])')
under_pat = re.compile(r'_([a-z])')


def camel_to_underscore(name):
    return camel_pat.sub(lambda x: '_' + x.group(1).lower(), name)


def underscore_to_camel(name):
    return under_pat.sub(lambda x: x.group(1).upper(), name)


def convert_json(d, convert):
    new_d = {}
    for k, v in d.items():
        new_d[convert(k)] = convert_json(v,convert) if isinstance(v,dict) else v
    return new_d


def define_env(env):

    @env.macro
    def maze(board: str, size, generator = None, **kwargs):
        width, height = 0, 0

        cell_size = kwargs.get('cell_size', 30)
        line_width = kwargs.get('line_width', 2)

        if board == 'rectangular':
            width = cell_size * (size[0] + line_width) + line_width
            height = cell_size * (size[1] + line_width) + line_width

        elif board == 'circular':
            # size = [radius, inner_radius] or radius
            size = [size, 4] if type(size) is int else size

            radius_offset = (1 - size[1]) * cell_size * 0.75 + size[1] * cell_size
            radius = cell_size * (size[0]-size[1]) + radius_offset
            width = radius * 2 + line_width
            height = width

        obj = {'board': board, 'size': size, 'generator': generator, **kwargs}
        obj = convert_json(obj, underscore_to_camel)
        return f'<div data-maze=\'{json.dumps(obj)}\' style="width: {width}px; height: {height}px;"></div>'
