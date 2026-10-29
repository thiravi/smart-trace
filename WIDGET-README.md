# SmartTrace - Embeddable Feedback Widget

A lightweight, embeddable feedback widget that automatically records user sessions and captures detailed system information for better bug reports and user feedback.

## 🚀 Quick Start

### Option 1: CDN (Recommended)
```html
<!-- Add to your website's <head> or before closing </body> tag -->
<script src="https://unpkg.com/smarttrace@latest/dist/smart-trace.umd.js"></script>
<script>
  initSmartTrace();
</script>
```

### Option 2: Self-hosted
1. Download `smart-trace.umd.js` from the releases
2. Host it on your server
3. Include the script:
```html
<script src="/path/to/smart-trace.umd.js"></script>
<script>
  initSmartTrace();
</script>
```

### Option 3: Auto-initialization with Configuration
```html
<script>
  // Set config before loading the script
  window.SmartTraceConfig = {
    position: 'bottom-left',
    showRecordingControl: true,
    onFeedback: function(data) {
      // Handle feedback data
      console.log('Feedback received:', data);
      // Send to your backend
    }
  };
</script>
<script src="https://unpkg.com/smarttrace@latest/dist/smart-trace.umd.js"></script>
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Widget position on screen |
| `showRecordingControl` | `boolean` | `false` | Show manual recording start/stop buttons |
| `autoStart` | `boolean` | `true` | Automatically start recording on page load |
| `onFeedback` | `function` | `undefined` | Callback function for feedback submissions |
| `apiKey` | `string` | `undefined` | API key for authentication |
| `apiEndpoint` | `string` | `undefined` | Custom endpoint for feedback submission |

## 📝 Usage Examples

### Basic Usage
```javascript
// Initialize with default settings
const widget = initSmartTrace();
```

### Advanced Configuration
```javascript
const widget = initSmartTrace({
  position: 'top-left',
  showRecordingControl: true,
  onFeedback: function(feedbackData) {
    // feedbackData contains:
    // - type: 'bug' | 'appreciation' | 'feature'
    // - description: string
    // - email: string (optional)
    // - systemInfo: object (browser, OS, performance data)
    // - sessionRecording: array (rrweb events)
    // - performanceMetrics: object
    
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
  }
});
```

### Dynamic Control
```javascript
// Initialize widget
const widget = initSmartTrace({
  position: 'bottom-right'
});

// Update configuration later
widget.updateConfig({
  position: 'top-left',
  showRecordingControl: true
});

// Destroy widget
widget.destroy();
```

## 📊 Feedback Data Structure

When a user submits feedback, the `onFeedback` callback receives an object with:

```javascript
{
  type: 'bug' | 'appreciation' | 'feature',
  description: 'User feedback description',
  email: 'user@example.com', // Optional
  systemInfo: {
    userAgent: 'Mozilla/5.0...',
    language: 'en-US',
    platform: 'Win32',
    screenResolution: '1920x1080',
    viewport: '1024x768',
    timezone: 'America/New_York',
    connection: {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50
    },
    memory: '8 GB',
    cores: 8,
    url: 'https://example.com/page',
    timestamp: '2024-01-15T10:30:00.000Z'
  },
  sessionRecording: [
    // Array of rrweb events for session replay
    { type: 2, data: {...}, timestamp: 1642248600000 },
    // ... more events
  ],
  performanceMetrics: {
    loadTime: 1250, // milliseconds
    domReady: 800   // milliseconds
  }
}
```

## 🎮 User Experience

1. **Automatic Recording**: Starts recording user interactions immediately
2. **Feedback Button**: Floating button appears in configured position
3. **Feedback Types**: Users can choose from:
   - 🐛 Report Issue
   - ❤️ Appreciate
   - 💡 Suggest Feature
4. **Session Replay**: All interactions are captured for playback
5. **System Context**: Comprehensive technical information included

## 🔒 Privacy & Security

- **No Sensitive Data**: Passwords and sensitive form fields are automatically excluded
- **Local Processing**: All recording happens client-side
- **User Consent**: Users explicitly submit feedback
- **Configurable**: Full control over what data is sent where

## 🛠️ Development

### Building the Widget
```bash
# Install dependencies
npm install

# Build for production
npm run build:widget

# This creates dist/smart-trace.umd.js
```

### Testing Locally
```bash
# Start development server
npm run dev

# Open example.html in browser to test integration
```

## 📦 File Size

- **Minified**: ~150KB (includes React, rrweb, and all dependencies)
- **Gzipped**: ~45KB
- **Zero dependencies** required on host website

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Integration Examples

### WordPress
```php
// Add to theme's functions.php
function add_smart_trace() {
    ?>
    <script src="https://unpkg.com/smarttrace@latest/dist/smart-trace.umd.js"></script>
    <script>
        initSmartTrace({
            onFeedback: function(data) {
                fetch('<?php echo admin_url("admin-ajax.php"); ?>', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: 'action=handle_feedback&data=' + encodeURIComponent(JSON.stringify(data))
                });
            }
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_smart_trace');
```

### Shopify
```html
<!-- Add to theme.liquid before </body> -->
<script src="https://unpkg.com/smarttrace@latest/dist/smart-trace.umd.js"></script>
<script>
  initSmartTrace({
    onFeedback: function(data) {
      // Send to Shopify webhook or external service
      fetch('/apps/feedback', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
    }
  });
</script>
```

### React/Next.js
```jsx
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Load script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smarttrace@latest/dist/smart-trace.umd.js';
    script.onload = () => {
      window.initSmartTrace({
        onFeedback: (data) => {
          // Handle feedback
          console.log('Feedback:', data);
        }
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div>Your app content</div>;
}
```

## 📞 Support

For issues, feature requests, or questions:
- Create an issue on GitHub
- Email: support@smarttrace.com
- Documentation: https://smarttrace.com/docs