import { useState, useEffect } from 'react';
import { Bug, Heart, Lightbulb, X, Send, Video, VideoOff } from 'lucide-react';
import { record } from 'rrweb';

// Global recording state that persists across component re-renders
const globalRecording = {
  events: [] as unknown[],
  stopFn: null as (() => void) | null,
  isRecording: false,
  hasInitialized: false
};

interface TimeMachineWidgetProps {
  showRecordingControl?: boolean;
}

const collectGeoLocation = async (): Promise<any> => {
  try {
    console.log('🌍 Starting geo-location collection...');
    
    // First, try to get accurate location from IP geolocation service
    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const ipData = await response.json();
        console.log('✅ IP geolocation successful:', ipData);
        
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language;
        
        const geoData = {
          country: ipData.country_name || 'Unknown',
          countryCode: ipData.country_code || 'XX',
          region: ipData.region || 'Unknown',
          regionCode: ipData.region_code || 'XX',
          city: ipData.city || 'Unknown',
          latitude: ipData.latitude || null,
          longitude: ipData.longitude || null,
          accuracy: null,
          timezone: ipData.timezone || timezone,
          locale: locale,
          timestamp: new Date().toISOString(),
          isp: ipData.org || 'Unknown',
          org: ipData.org || 'Unknown',
          ip: ipData.ip || 'Unknown',
          postal: ipData.postal || null,
          continent: ipData.continent_code || null
        };
        
        console.log('✅ Geo-location collected via IP API:', geoData);
        return geoData;
      }
    } catch (ipError) {
      console.warn('⚠️ IP geolocation failed, falling back to browser API:', ipError);
    }
    
    // Fallback to browser Geolocation API
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('✅ Browser geolocation successful:', position.coords);
            
            // Get timezone and locale info using built-in APIs
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const locale = navigator.language;
            
            // Extract region info from timezone if possible
            const timezoneParts = timezone.split('/');
            const region = timezoneParts.length > 1 ? timezoneParts[0] : 'Unknown';
            const city = timezoneParts.length > 1 ? timezoneParts[timezoneParts.length - 1].replace(/_/g, ' ') : 'Unknown';
            
            // Try to get country from locale
            const localeCountry = locale.includes('-') ? locale.split('-')[1].toUpperCase() : 'XX';
            
            const geoData = {
              country: getCountryFromTimezone(timezone),
              countryCode: localeCountry,
              region: region,
              regionCode: 'XX',
              city: city,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timezone: timezone,
              locale: locale,
              timestamp: new Date(position.timestamp).toISOString(),
              isp: 'Unknown',
              org: 'Unknown',
              ip: 'Unknown'
            };
            
            console.log('✅ Geo-location collected using browser API:', geoData);
            resolve(geoData);
          },
          (error) => {
            console.warn('⚠️ Browser geolocation failed:', error.message);
            
            // Final fallback to timezone-only data
            try {
              const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
              const locale = navigator.language;
              
              // Try to extract country from locale
              const localeCountry = locale.includes('-') ? locale.split('-')[1].toUpperCase() : 'XX';
              
              // Extract region info from timezone
              const timezoneParts = timezone.split('/');
              const region = timezoneParts.length > 1 ? timezoneParts[0] : 'Unknown';
              const city = timezoneParts.length > 1 ? timezoneParts[timezoneParts.length - 1].replace(/_/g, ' ') : 'Unknown';
              
              const fallbackData = {
                country: getCountryFromTimezone(timezone),
                countryCode: localeCountry,
                region: region,
                regionCode: 'XX',
                city: city,
                latitude: null,
                longitude: null,
                accuracy: null,
                timezone: timezone,
                locale: locale,
                timestamp: new Date().toISOString(),
                isp: 'Unknown',
                org: 'Unknown',
                ip: 'Unknown',
                fallbackReason: 'Geolocation permission denied or unavailable'
              };
              
              console.log('⚠️ Using timezone/locale fallback geo-location:', fallbackData);
              resolve(fallbackData);
            } catch (fallbackError) {
              console.warn('❌ Timezone fallback failed:', fallbackError);
              resolve(null);
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 // Cache for 5 minutes
          }
        );
      });
    } else {
      console.warn('⚠️ Browser geolocation not supported');
      
      // Fallback to timezone-only data
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language;
        
        // Try to extract country from locale
        const localeCountry = locale.includes('-') ? locale.split('-')[1].toUpperCase() : 'XX';
        
        // Extract region info from timezone
        const timezoneParts = timezone.split('/');
        const region = timezoneParts.length > 1 ? timezoneParts[0] : 'Unknown';
        const city = timezoneParts.length > 1 ? timezoneParts[timezoneParts.length - 1].replace(/_/g, ' ') : 'Unknown';
        
        const fallbackData = {
          country: getCountryFromTimezone(timezone),
          countryCode: localeCountry,
          region: region,
          regionCode: 'XX',
          city: city,
          latitude: null,
          longitude: null,
          accuracy: null,
          timezone: timezone,
          locale: locale,
          timestamp: new Date().toISOString(),
          isp: 'Unknown',
          org: 'Unknown',
          ip: 'Unknown',
          fallbackReason: 'Geolocation API not supported'
        };
        
        console.log('⚠️ Using timezone/locale only geo-location:', fallbackData);
        return fallbackData;
      } catch (error) {
        console.warn('❌ All built-in geo-location methods failed:', error);
        return null;
      }
    }
  } catch (error) {
    console.warn('❌ Geo-location collection failed:', error);
    return null;
  }
};

// Helper function to map timezone to country name
const getCountryFromTimezone = (timezone: string): string => {
  const timezoneCountryMap: Record<string, string> = {
    'Asia/Kolkata': 'India',
    'Asia/Calcutta': 'India',
    'America/New_York': 'United States',
    'America/Los_Angeles': 'United States',
    'America/Chicago': 'United States',
    'Europe/London': 'United Kingdom',
    'Europe/Paris': 'France',
    'Europe/Berlin': 'Germany',
    'Asia/Tokyo': 'Japan',
    'Asia/Shanghai': 'China',
    'Asia/Dubai': 'United Arab Emirates',
    'Asia/Singapore': 'Singapore',
    'Australia/Sydney': 'Australia',
    'Pacific/Auckland': 'New Zealand',
  };
  
  return timezoneCountryMap[timezone] || 'Unknown';
};

const collectSystemInfo = () => {
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
    };
    deviceMemory?: number;
  };
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    connection: nav.connection ? {
      effectiveType: nav.connection.effectiveType,
      downlink: nav.connection.downlink,
      rtt: nav.connection.rtt
    } : 'Not available' as const,
    memory: nav.deviceMemory ? `${nav.deviceMemory} GB` : 'Not available',
    cores: navigator.hardwareConcurrency || 0,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    referrer: document.referrer || undefined
  };
};

const TimeMachineWidget = ({ 
  showRecordingControl = false
}: TimeMachineWidgetProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(globalRecording.isRecording);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-start recording on initial page load (only once globally)
  useEffect(() => {
    const startRecordingInternal = () => {
      if (globalRecording.stopFn) {
        console.log('🎥 Recording already active');
        return;
      }

      console.log('🎥 Recording started - Mode:', showRecordingControl ? 'Manual' : 'Auto (from page load)');
      globalRecording.isRecording = true;
      setIsRecording(true);
      
      // Only reset events if this is manual mode and we're starting fresh
      if (showRecordingControl) {
        globalRecording.events = [];
      }
      
      const stopRecordingFunction = record({
        emit(event: unknown) {
          globalRecording.events.push(event);
        },
        checkoutEveryNms: 10 * 1000,
      });
      
      globalRecording.stopFn = stopRecordingFunction || null;
      
      console.log('🎥 Recording initialized. Events will accumulate...');
    };

    if (!showRecordingControl && !globalRecording.hasInitialized) {
      globalRecording.hasInitialized = true;
      startRecordingInternal();
    }
  }, [showRecordingControl]);

  // Sync local state with global recording state
  useEffect(() => {
    setIsRecording(globalRecording.isRecording);
  }, []);

  const startRecording = () => {
    if (globalRecording.stopFn) {
      console.log('🎥 Recording already active');
      return;
    }

    console.log('🎥 Recording started - Mode:', showRecordingControl ? 'Manual' : 'Auto (from page load)');
    globalRecording.isRecording = true;
    setIsRecording(true);
    
    // Only reset events if this is manual mode and we're starting fresh
    if (showRecordingControl) {
      globalRecording.events = [];
    }
    
    const stopRecordingFunction = record({
      emit(event: unknown) {
        globalRecording.events.push(event);
      },
      checkoutEveryNms: 10 * 1000,
    });
    
    globalRecording.stopFn = stopRecordingFunction || null;
    
    console.log('🎥 Recording initialized. Events will accumulate...');
  };

  const stopRecording = () => {
    if (globalRecording.stopFn) {
      globalRecording.stopFn();
      globalRecording.stopFn = null;
      globalRecording.isRecording = false;
      setIsRecording(false);
      console.log('🎥 Recording stopped. Total events captured:', globalRecording.events.length);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert('Please provide a description');
      return;
    }

    setIsSubmitting(true);
    
    // Stop recording to capture final state
    const wasRecording = globalRecording.isRecording;
    if (wasRecording) {
      stopRecording();
    }

    console.log('📊 Final event count:', globalRecording.events.length);

    // Collect geo-location data
    const geoLocation = await collectGeoLocation();

    const feedbackData = {
      type: feedbackType,
      description,
      email,
      systemInfo: collectSystemInfo(),
      geoLocation,
      sessionRecording: globalRecording.events,
      performanceMetrics: {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
      }
    };

    if (typeof window !== 'undefined' && (window as Window & { onTimeMachineFeedback?: (data: unknown) => void }).onTimeMachineFeedback) {
      (window as Window & { onTimeMachineFeedback?: (data: unknown) => void }).onTimeMachineFeedback!(feedbackData);
    }

    console.log('📤 Submitting feedback:', feedbackData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
        setFeedbackType(null);
        setDescription('');
        setEmail('');
        
        // Restart recording if in auto mode
        if (!showRecordingControl) {
          globalRecording.events = [];
          startRecording();
        } else {
          globalRecording.events = [];
        }
      }, 2000);
    }, 1500);
  };

  const feedbackTypes = [
    { id: 'bug', label: 'Report Issue', icon: Bug, color: 'bg-red-500', hoverColor: 'hover:bg-red-600' },
    { id: 'appreciation', label: 'Appreciate', icon: Heart, color: 'bg-pink-500', hoverColor: 'hover:bg-pink-600' },
    { id: 'feature', label: 'Suggest Feature', icon: Lightbulb, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen && (
        <div className="mb-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">TimeMachine</h3>
                  <p className="text-xs opacity-90">Help us improve</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h4>
                <p className="text-gray-600">Your feedback has been submitted successfully.</p>
              </div>
            ) : !feedbackType ? (
              <div>
                <p className="text-gray-600 mb-4 text-sm">
                  Choose how you'd like to help us:
                </p>
                <div className="space-y-3">
                  {feedbackTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setFeedbackType(type.id);
                          if (showRecordingControl && !isRecording) {
                            startRecording();
                          }
                        }}
                        className={`w-full ${type.color} ${type.hoverColor} text-white p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-md`}
                      >
                        <Icon size={24} />
                        <span className="font-semibold">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {isRecording && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-700 font-medium">
                      {showRecordingControl ? 'Session recording active' : `Recording entire session (${globalRecording.events.length} events)`}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {feedbackType === 'bug' && 'Describe the issue'}
                    {feedbackType === 'appreciation' && 'What did you love?'}
                    {feedbackType === 'feature' && 'Describe your idea'}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {showRecordingControl && (
                  <button
                    type="button"
                    onClick={() => isRecording ? stopRecording() : startRecording()}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                      isRecording 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isRecording ? <VideoOff size={16} /> : <Video size={16} />}
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFeedbackType(null);
                      if (showRecordingControl) {
                        stopRecording();
                        globalRecording.events = [];
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-700 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <span className="text-2xl">🎯</span>
      </button>
    </div>
  );
};

export default TimeMachineWidget;
