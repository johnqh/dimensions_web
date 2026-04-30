#!/usr/bin/env python3
"""Generate Sudobility logo - 1024x1024 PNG.

Design: An abstract "S" formed from rounded blocks arranged in a grid pattern,
evoking sudoku grids and puzzle-solving. The S-curve flows through a 5x5 grid
with a blue-to-cyan gradient. Clean, modern, tech-forward.
"""

from PIL import Image, ImageDraw
import math

SIZE = 1024
CENTER = SIZE // 2

# ── colour palette (matches the dark landing page) ──
BG_COLOR = (15, 23, 42)  # slate-900

# Gradient colors
C_BLUE    = (59, 130, 246)   # blue-500
C_INDIGO  = (99, 102, 241)   # indigo-500
C_VIOLET  = (139, 92, 246)   # violet-500
C_PURPLE  = (168, 85, 247)   # purple-500
C_CYAN    = (6, 182, 212)    # cyan-500

def lerp(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * max(0, min(1, t))) for i in range(3))

def multi_gradient(t, stops):
    """Multi-stop gradient. stops = list of (position, color)."""
    if t <= stops[0][0]:
        return stops[0][1]
    if t >= stops[-1][0]:
        return stops[-1][1]
    for i in range(len(stops) - 1):
        if stops[i][0] <= t <= stops[i + 1][0]:
            local_t = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0])
            return lerp(stops[i][1], stops[i + 1][1], local_t)
    return stops[-1][1]


def draw_rounded_rect(draw, bbox, radius, fill):
    x0, y0, x1, y1 = [int(v) for v in bbox]
    r = min(int(radius), (x1 - x0) // 2, (y1 - y0) // 2)
    if r <= 0:
        draw.rectangle([x0, y0, x1, y1], fill=fill)
        return
    draw.rectangle([x0 + r, y0, x1 - r, y1], fill=fill)
    draw.rectangle([x0, y0 + r, x1, y1 - r], fill=fill)
    draw.pieslice([x0, y0, x0 + 2*r, y0 + 2*r], 180, 270, fill=fill)
    draw.pieslice([x1 - 2*r, y0, x1, y0 + 2*r], 270, 360, fill=fill)
    draw.pieslice([x0, y1 - 2*r, x0 + 2*r, y1], 90, 180, fill=fill)
    draw.pieslice([x1 - 2*r, y1 - 2*r, x1, y1], 0, 90, fill=fill)


def create_logo():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ── S-shape from a 5x5 conceptual grid ──
    # The S flows:
    #  row 0:  . X X X .
    #  row 1:  X X . . .
    #  row 2:  . X X X .
    #  row 3:  . . . X X
    #  row 4:  . X X X .
    #
    # This creates a beautiful flowing S through the grid

    s_cells = [
        # Row 0: top bar
        (1, 0), (2, 0), (3, 0),
        # Row 1: left turn
        (0, 1), (1, 1),
        # Row 2: middle bar
        (1, 2), (2, 2), (3, 2),
        # Row 3: right turn
        (3, 3), (4, 3),
        # Row 4: bottom bar
        (1, 4), (2, 4), (3, 4),
    ]

    # Grid layout — centered, no text below so use full space
    grid_n = 5
    cell_size = 120
    gap = 16
    total_grid = grid_n * cell_size + (grid_n - 1) * gap  # 5*120 + 4*16 = 664
    grid_x0 = CENTER - total_grid // 2
    grid_y0 = CENTER - total_grid // 2

    radius = 22

    # Gradient stops
    stops = [
        (0.0, C_BLUE),
        (0.25, C_INDIGO),
        (0.5, C_VIOLET),
        (0.75, C_PURPLE),
        (1.0, C_CYAN),
    ]

    y_min = min(r for _, r in s_cells)
    y_max = max(r for _, r in s_cells)

    # ── Draw the grid cells ──
    for col, row in s_cells:
        x = grid_x0 + col * (cell_size + gap)
        y = grid_y0 + row * (cell_size + gap)
        t = (row - y_min) / max(y_max - y_min, 1)
        color = multi_gradient(t, stops)

        # Subtle per-cell alpha variation for depth
        alpha = 230 + int(25 * (0.5 + 0.5 * math.sin(col * 0.7 + row * 1.3)))
        alpha = min(alpha, 255)

        draw_rounded_rect(draw, (x, y, x + cell_size, y + cell_size),
                          radius, (*color, alpha))

    # ── Subtle highlight on top edge of each cell ──
    highlight = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(highlight)
    for col, row in s_cells:
        x = grid_x0 + col * (cell_size + gap)
        y = grid_y0 + row * (cell_size + gap)
        # Top highlight strip
        draw_rounded_rect(h_draw,
                          (x + 3, y + 3, x + cell_size - 3, y + 14),
                          radius - 2, (255, 255, 255, 18))
    img = Image.alpha_composite(img, highlight)
    draw = ImageDraw.Draw(img)

    return img


if __name__ == "__main__":
    logo = create_logo()
    logo.save("/Users/johnhuang/sudobility/public/logo.png", "PNG", quality=95)
    print("Logo saved to public/logo.png (1024x1024)")
