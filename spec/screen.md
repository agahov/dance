# Game Screen Settings and Logic

## Screen Configuration
- **Target Resolution**: 1280×780 pixels
- **Aspect Ratio**: 16:10 (1.6)
- **Scaling Strategy**: Scale with preservation of proportions using the longest side

## Scaling Logic

### Implementation Approach
The game screen needs to scale to fit within the available browser window while maintaining the original aspect ratio. Here's how it should work:

1. Calculate the available window dimensions
2. Determine the scale factor based on the longest side
3. Apply scaling to maintain 16:10 aspect ratio

### Scale Calculation
```
available_width = window.innerWidth
available_height = window.innerHeight

target_width = 1280
target_height = 780

scale_x = available_width / target_width
scale_y = available_height / target_height

scale = Math.min(scale_x, scale_y)  // Using the smaller scale to ensure full visibility

final_width = target_width * scale
final_height = target_height * scale
```

### Screen Positioning
To center the game screen:
```
offset_x = (window.innerWidth - final_width) / 2
offset_y = (window.innerHeight - final_height) / 2
```

## Game Window Behavior
- **Minimum Scale**: 1x (original size)
- **Maximum Scale**: No limit (but should fit within screen)
- **Full Visibility**: Ensures the entire game screen is visible
- **Responsive**: Adapts to different screen sizes and orientations
- **Centered**: Game screen is centered on the window

## Implementation Details
- The game canvas should be created with the target resolution (1280×780)
- The canvas is then scaled to fit the available screen space
- All game elements are positioned relative to the original coordinate system
- When scaling occurs, pixel-perfect rendering is maintained
- The coordinate system should be preserved (0,0 at top-left)