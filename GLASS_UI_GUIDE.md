# 3D Glass Morphism UI Guide

## 🎨 Glass Effect Classes

### `.glass-card`
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```
**Usage**: Main container for cards with frosted glass effect
**Hover**: Lifts up 4px with enhanced shadow

### `.card-3d`
```css
transform-style: preserve-3d;
perspective: 1000px;
```
**Usage**: Adds 3D perspective to cards
**Hover**: Rotates 5deg on Y and X axis

### `.glass-button`
```css
background: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.3);
```
**Usage**: Transparent buttons with glass effect
**Hover**: Scales to 1.05 and increases opacity

## 🎯 Component Examples

### Action Card with Glass Effect
```tsx
<button className="glass-card p-6 rounded-2xl border-2 transition-all 
                   transform hover:scale-105 hover:-translate-y-1 
                   bg-gradient-to-br from-blue-50 to-blue-100">
  {/* Content */}
</button>
```

### Service Tile with 3D Effect
```tsx
<button className="glass-card border-2 border-white/40 rounded-2xl 
                   shadow-lg hover:shadow-2xl hover:-translate-y-2 
                   card-3d">
  {/* Content */}
</button>
```

### Stat Card with Glow
```tsx
<div className="glass-card rounded-2xl p-6 card-3d glow-blue">
  {/* Stats content */}
</div>
```

## 🌈 Color Gradients

### Background Gradients
- **Blue**: `from-blue-50 to-blue-100`
- **Red**: `from-red-50 to-red-100`
- **Amber**: `from-amber-50 to-amber-100`
- **Emerald**: `from-emerald-50 to-emerald-100`

### Hover Gradients
- **Blue**: `hover:from-blue-600 hover:to-blue-700`
- **Red**: `hover:from-red-600 hover:to-red-700`
- **Amber**: `hover:from-amber-500 hover:to-amber-600`

## ✨ Animation Effects

### Hover Lift
```css
hover:-translate-y-1  /* Lifts 4px */
hover:-translate-y-2  /* Lifts 8px */
```

### Scale Transform
```css
hover:scale-105  /* Scales to 105% */
hover:scale-110  /* Scales to 110% */
```

### Shadow Depth
```css
shadow-lg         /* Base shadow */
hover:shadow-2xl  /* Enhanced shadow on hover */
```

## 🎭 Special Effects

### Floating Animation
```tsx
<div className="float-animation">
  {/* Floats up and down smoothly */}
</div>
```

### Glow Effects
```tsx
<div className="glow-blue">   {/* Blue glow */}
<div className="glow-red">    {/* Red glow */}
<div className="glow-green">  {/* Green glow */}
```

### Animated Gradient Background
```tsx
<div className="animated-gradient">
  {/* Shifts through multiple colors */}
</div>
```

## 📐 Layout Patterns

### Full-Width Feature Button
```tsx
<button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 
                   hover:from-blue-600 hover:to-blue-700 
                   text-white rounded-2xl p-6 shadow-lg 
                   hover:shadow-2xl transition-all duration-300 
                   transform hover:scale-105 hover:-translate-y-1">
  <div className="flex items-center gap-4">
    <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
      {icon}
    </div>
    <div className="text-left flex-1">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-white/90 text-sm">{description}</p>
    </div>
    <ChevronRight />
  </div>
</button>
```

### Glass Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="glass-card rounded-2xl p-6 card-3d">
    {/* Card 1 */}
  </div>
  <div className="glass-card rounded-2xl p-6 card-3d">
    {/* Card 2 */}
  </div>
  <div className="glass-card rounded-2xl p-6 card-3d">
    {/* Card 3 */}
  </div>
</div>
```

## 🎨 Best Practices

### DO ✅
- Use glass effects on primary interactive elements
- Combine with subtle gradients for depth
- Add hover states for better UX
- Use backdrop-blur for frosted glass look
- Layer shadows for elevation hierarchy

### DON'T ❌
- Overuse glass effects (causes visual clutter)
- Use on text-heavy content (reduces readability)
- Combine too many effects on one element
- Forget hover states on interactive elements
- Use without proper contrast ratios

## 🔧 Performance Tips

1. **Use CSS transforms** instead of position changes
2. **Limit backdrop-filter** usage (expensive operation)
3. **Use will-change** for frequently animated elements
4. **Prefer opacity** over visibility for transitions
5. **Use hardware acceleration** with transform3d

## 📱 Responsive Considerations

```tsx
{/* Mobile: Simpler effects */}
<div className="glass-card md:card-3d">
  
{/* Desktop: Full 3D effects */}
<div className="hover:scale-105 md:hover:scale-110">
```

## 🎯 Accessibility

- Maintain **4.5:1 contrast ratio** for text
- Ensure **focus states** are visible
- Use **semantic HTML** elements
- Add **aria-labels** for icon-only buttons
- Test with **screen readers**

---

**Pro Tip**: Combine multiple effects for maximum impact:
```tsx
<div className="glass-card card-3d glow-blue float-animation">
  {/* Ultra-premium UI element */}
</div>
```
