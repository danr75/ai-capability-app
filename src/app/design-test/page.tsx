import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormField } from "@/components/ui/form-field"

export default function DesignTestPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Design System Test</h1>
      
      {/* Color Palette */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">AI Learning App Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-primary text-primary-foreground p-4 rounded">
            <div className="font-semibold">Primary Blue</div>
            <div className="text-sm opacity-90">#2158F4</div>
            <div className="text-xs mt-1">Nav bar, headings</div>
          </div>
          <div className="bg-secondary text-secondary-foreground p-4 rounded">
            <div className="font-semibold">Progress Blue</div>
            <div className="text-sm opacity-90">#4F8BFF</div>
            <div className="text-xs mt-1">Progress bars</div>
          </div>
          <div className="bg-success text-success-foreground p-4 rounded">
            <div className="font-semibold">Success Green</div>
            <div className="text-sm opacity-90">#00C48C</div>
            <div className="text-xs mt-1">Excelling, positive</div>
          </div>
          <div className="bg-warning text-warning-foreground p-4 rounded">
            <div className="font-semibold">Attention Red</div>
            <div className="text-sm opacity-90">#FF5A5F</div>
            <div className="text-xs mt-1">Needs attention</div>
          </div>
          <div className="bg-purple text-purple-foreground p-4 rounded">
            <div className="font-semibold">Target Purple</div>
            <div className="text-sm opacity-90">#B681FC</div>
            <div className="text-xs mt-1">Goal indicators</div>
          </div>
          <div className="bg-muted border border-border p-4 rounded">
            <div className="font-semibold text-text-primary">Card Background</div>
            <div className="text-sm text-text-secondary">#FFFFFF</div>
            <div className="text-xs mt-1 text-text-secondary">Clean cards</div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Button Components</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Progress</Button>
              <Button variant="success">Excelling</Button>
              <Button variant="warning">Needs Attention</Button>
              <Button variant="purple">Target</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small (12-14px)</Button>
              <Button size="default">Default (14-16px)</Button>
              <Button size="lg">Large (20-24px)</Button>
              <Button size="icon">🎯</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Components */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Form Components</h2>
        <div className="max-w-md space-y-4">
          <FormField
            label="Email"
            required
            helperText="Enter your email address"
          >
            <Input type="email" placeholder="user@example.com" />
          </FormField>
          
          <FormField
            label="Password"
            required
            error="Password must be at least 8 characters"
          >
            <Input type="password" placeholder="••••••••" error />
          </FormField>
          
          <FormField label="Optional Field">
            <Input placeholder="This field is optional" />
          </FormField>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-medium">Heading 3</h3>
          <p className="text-base">Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="text-sm text-muted-foreground">Small text - Additional information or helper text.</p>
        </div>
      </section>
    </div>
  )
}
