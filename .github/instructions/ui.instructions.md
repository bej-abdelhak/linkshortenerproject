---
description: Read this before implementing or modifying UI components in the project.

---

# UI Components — shadcn/ui Required

**Last Updated**: March 19, 2026

---

## Core Rule

**ALL UI elements in this app must use shadcn/ui.** No custom components are permitted, even for simple cases. This ensures consistency, maintainability, and leverages the design system already in place.

### What This Means
- ✅ Use shadcn/ui for every interactive element (buttons, inputs, dialogs, dropdowns, etc.)
- ✅ Extend shadcn components via variant props and CSS when customization is needed
- ✅ Place components in `components/ui/` after adding them via CLI
- ❌ Do NOT create custom wrapper components that replace shadcn functionality
- ❌ Do NOT build custom-designed buttons, cards, modals, or input fields
- ❌ Do NOT assume "simple components" don't need shadcn (use it anyway)

---

## How to Use shadcn/ui

### 1. Import Existing Components

Components are located in `components/ui/`:

```tsx
// ✅ Correct: Import from local components/ui/
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

### 2. Extend via Variant Props and CSS

shadcn components support variant props (e.g., `variant`, `size`) and className customization via Tailwind:

```tsx
import { Button } from "@/components/ui/button";

export default function CustomButton() {
  // ✅ Use variant props
  return (
    <Button variant="destructive" size="lg">
      Delete
    </Button>
  );
}
```

If you need style variations, use Tailwind classes:

```tsx
// ✅ Combine with Tailwind for minimal customization
<Button className="rounded-full px-8">Custom Shape</Button>
```

### 3. Add New shadcn Components

If you need a component not yet in `components/ui/`, use the shadcn CLI:

```bash
npx shadcn-ui@latest add <component-name>
```

**Common components to add:**
- `input` — Text fields, search boxes, form inputs
- `card` — Content containers, panels, sections
- `dialog` — Modals, confirmations, form dialogs
- `dropdown-menu` — Dropdown menus and action menus
- `textarea` — Multi-line text input
- `select` — Dropdown selects
- `checkbox` — Checkboxes for forms
- `radio-group` — Radio buttons
- `label` — Form labels
- `badge` — Status badges, tags
- `tooltip` — Help text on hover
- `loading-spinner` or `spinner` — Loading indicators

**After adding, commit the component to version control.**

---

## Common Patterns

### Form with Input & Button
```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Form() {
  return (
    <div className="space-y-4">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
      <Button type="submit">Submit</Button>
    </div>
  );
}
```

### Card Layout
```tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardExample() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Title</h2>
      <p className="text-sm text-gray-600 mt-2">Description</p>
      <Button className="mt-4">Action</Button>
    </Card>
  );
}
```

### Dialog Modal
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ModalExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <p>Are you sure?</p>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Important Notes

- ✅ All shadcn components are TypeScript-friendly with proper type exports
- ✅ Components use Tailwind CSS — no additional CSS files needed
- ✅ Variants and props are documented in shadcn docs: https://ui.shadcn.com
- ✅ Always check `components/ui/<component>.tsx` to see available props and variants
- ❌ Do NOT create alternative versions (e.g., `CustomButton`, `AppButton`, `PrimaryButton`)
- ❌ Do NOT style components directly in parent files — use variant props first
- ❌ Do NOT assume a component doesn't exist — search `components/ui/` and check shadcn CLI

---

## When in Doubt

1. **Check if component exists**: Look in `components/ui/` or run `npx shadcn-ui@latest list`
2. **Check variant props**: Read the component file to see available customization options
3. **Use shadcn add**: If the component doesn't exist, add it via the CLI
4. **Ask before creating**: Never create a custom component without confirming it's truly needed

