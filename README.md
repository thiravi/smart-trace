# @samplecompany-hackathon/smarttrace

A lightweight, embeddable feedback widget that automatically records user sessions and captures detailed system information for better bug reports and user feedback.

## 🚀 Quick Start

### Installation

First, configure your npm registry to access the private package:

#### 1. Create/Update `.npmrc` file

Create a `.npmrc` file in your project root (or update your global one):

```bash
# Option 1: Project-specific .npmrc (recommended)
echo "@samplecompany-hackathon:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
always-auth=true" > .npmrc

# Option 2: Global .npmrc (affects all projects)
npm config set @samplecompany-hackathon:registry https://npm.pkg.github.com/
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN_HERE
npm config set always-auth true
```

Or manually create `.npmrc` in your project root:
```properties
@samplecompany-hackathon:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
always-auth=true
```

#### 2. Get Your GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "npm-packages-access")
4. Set expiration (90 days recommended for security)
5. Select these scopes:
   - `read:packages` - to download packages
   - `write:packages` - if you need to publish packages
6. Click "Generate token"
7. **Copy the token immediately** (you won't be able to see it again)
8. Replace `YOUR_TOKEN_HERE` in your `.npmrc` with the actual token

#### 3. Install the package

```bash
# Install from the private npm registry
npm install @samplecompany-hackathon/smarttrace

# Or with yarn
yarn add @samplecompany-hackathon/smarttrace
```

### Basic Usage

#### Option 1: ES Modules (Recommended for modern bundlers)
```javascript
import { initSmartTrace } from '@samplecompany-hackathon/smarttrace';
import '@samplecompany-hackathon/smarttrace/style.css';

// Initialize with default settings
const widget = initSmartTrace();
```

#### Option 2: CommonJS
```javascript
const { initSmartTrace } = require('@samplecompany-hackathon/smarttrace');
require('@samplecompany-hackathon/smarttrace/style.css');

const widget = initSmartTrace();
```

#### Option 3: Direct Script Tag (CDN/Self-hosted)
```html
<link rel="stylesheet" href="./node_modules/@samplecompany-hackathon/smarttrace/dist/smarttrace.css">
<script src="./node_modules/@samplecompany-hackathon/smarttrace/dist/smarttrace.umd.cjs"></script>
<script>
  const { initSmartTrace } = SmartTrace;
  initSmartTrace();
</script>
```

## 📦 Package Contents

- **ES Module**: `dist/smart-trace.es.js`
- **UMD Bundle**: `dist/smart-trace.umd.cjs`
- **CSS Styles**: `dist/smarttrace.css`
- **TypeScript Types**: `dist/index.d.ts`

## 🔧 Framework Integration

### React/Next.js
```tsx
import { useEffect } from 'react';
import { initSmartTrace, type SmartTraceConfig } from '@samplecompany-hackathon/smarttrace';
import '@samplecompany-hackathon/smarttrace/style.css';

export default function App() {
  useEffect(() => {
    const config: SmartTraceConfig = {
      position: 'bottom-right',
      onFeedback: (data) => {
        // Send to your API
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
    };
    
    const widget = initSmartTrace(config);
    
    return () => widget.destroy();
  }, []);

  return <div>Your app content</div>;
}
```

### Vue.js
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { initSmartTrace } from '@samplecompany-hackathon/smarttrace';
import '@samplecompany-hackathon/smarttrace/style.css';

let widget = null;

onMounted(() => {
  widget = initSmartTrace({
    position: 'bottom-left',
    onFeedback: (data) => {
      console.log('Feedback received:', data);
    }
  });
});

onUnmounted(() => {
  widget?.destroy();
});
</script>
```

### Angular
```typescript
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { initSmartTrace, SmartTrace } from '@samplecompany-hackathon/smarttrace';

@Component({
  selector: 'app-root',
  template: '<div>Your app content</div>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private widget: SmartTrace | null = null;

  ngOnInit() {
    this.widget = initSmartTrace({
      onFeedback: (data) => {
        // Handle feedback
        this.handleFeedback(data);
      }
    });
  }

  ngOnDestroy() {
    this.widget?.destroy();
  }

  private handleFeedback(data: any) {
    // Send to your API
  }
}
```

```css
/* app.component.css or styles.css */
@import '@samplecompany-hackathon/smarttrace/style.css';
```

## 🏢 Organization Setup

### Private Registry Configuration

1. **Update your `.npmrc`** in your project root:
```properties
@your-org:registry=https://npm.your-org.com
//npm.your-org.com/:_authToken=${NPM_TOKEN}
```

2. **Set up authentication**:
```bash
# Set your auth token
export NPM_TOKEN=your-npm-token-here

# Or add to your CI/CD environment variables
```

### Publishing Updates

```bash
# Increment version and publish
npm version patch  # or minor/major
npm publish

# Or use the automated GitHub Actions workflow
git tag v1.0.1
git push origin v1.0.1
```

## 🔒 TypeScript Support

The package includes full TypeScript definitions:

```typescript
import { 
  initSmartTrace, 
  SmartTrace,
  type SmartTraceConfig,
  type FeedbackData 
} from '@samplecompany-hackathon/smarttrace';

const config: SmartTraceConfig = {
  position: 'bottom-right',
  showRecordingControl: true,
  onFeedback: (data: FeedbackData) => {
    // data is fully typed
    console.log(data.type); // 'bug' | 'appreciation' | 'feature'
    console.log(data.systemInfo.userAgent);
    console.log(data.sessionRecording.length);
  }
};

const widget: SmartTrace = initSmartTrace(config);
```

## 📊 Usage Analytics

Track widget usage across your organization:

```javascript
initSmartTrace({
  onFeedback: (data) => {
    // Send to your analytics
    analytics.track('feedback_submitted', {
      type: data.type,
      url: data.systemInfo.url,
      userAgent: data.systemInfo.userAgent
    });
    
    // Send to your feedback API
    submitFeedback(data);
  }
});
```

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/your-org/smarttrace.git
cd smarttrace

# Install dependencies
npm install

# Start development server
npm run dev

# Build package
npm run build

# Test example
open example.html
```

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Internal Issues**: Create an issue in the repository
- **Documentation**: See [WIDGET-README.md](./WIDGET-README.md) for detailed integration guide
- **Slack**: #smart-trace channel
