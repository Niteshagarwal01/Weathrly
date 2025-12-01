<p align="center">
  <img src="https://img.shields.io/badge/🌤️-Weathrly-blue?style=for-the-badge" alt="Logo" />
</p>

<h1 align="center">Weathrly</h1>

<p align="center">
A modern, real-time weather dashboard built with React, TypeScript, and Vite, featuring interactive maps, air quality monitoring, GPS location tracking, and responsive design.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#️-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-development">Development</a> •
  <a href="#-screenshots">Screenshots</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind" />
</p>

---

## 📸 Screenshots
<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/aca206c6-eba5-4326-a8ff-2ee2eeaa6a35" />
<img width="1915" height="923" alt="image" src="https://github.com/user-attachments/assets/e2d7dff9-dbe2-461f-b735-675a94591e91" />
<img width="1914" height="919" alt="image" src="https://github.com/user-attachments/assets/b269f73f-254c-48e3-aa03-f7b41450ff68" />
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/32707142-7164-4880-9ecf-1ca9bd287b16" />


## ✨ Features

### Core Functionality
| Feature | Description |
|---------|-------------|
| 🌡️ **Current Weather** | Real-time temperature, humidity, wind speed, and conditions |
| ⏰ **48-Hour Forecast** | Detailed hourly weather predictions |
| 📅 **8-Day Forecast** | Extended daily weather outlook with min/max temperatures |
| 🗺️ **Interactive Map** | Click anywhere to view weather with multiple layer options |
| 📍 **GPS Location** | Automatically detect your current location |
| 💨 **Air Quality Index** | Real-time AQI data from WAQI monitoring stations |

### Advanced Features
| Feature | Description |
|---------|-------------|
| 🌓 **Dark/Light Mode** | Toggle between themes for comfortable viewing |
| 🎨 **Weather Layers** | Clouds, temperature, precipitation, wind overlays |
| 📊 **Pollutant Breakdown** | CO, NO₂, O₃, SO₂, PM2.5, PM10 with quality indicators |
| ⚡ **Performance Optimized** | Suspense, lazy loading, and efficient data fetching |
| 🎯 **TanStack Query** | Smart caching and background data synchronization |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile devices |

### User Experience
| Feature | Description |
|---------|-------------|
| 🎪 **Smooth Animations** | Hover effects and transitions |
| 🌍 **Location Search** | Search for any city worldwide |
| 📋 **Additional Info** | UV index, pressure, sunrise/sunset, visibility |
| 🎨 **Modern UI** | Tailwind CSS with Radix UI components |

---

## 🛠️ Tech Stack

| Area | Technology |
|------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4.1, Radix UI |
| **State Management** | TanStack Query (React Query) |
| **Maps** | Leaflet, React-Leaflet |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Build Tool** | Vite 7.1 |

---

## 📂 File Structure

```
Weathrly/
├── public/                    # Static assets
├── src/
│   ├── api.ts                 # API functions (weather, geocode, air quality)
│   ├── App.tsx                # Main application component
│   ├── types.ts               # TypeScript type definitions
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── assets/                # SVG icons and images
│   ├── components/
│   │   ├── Map.tsx            # Interactive Leaflet map
│   │   ├── MapLegend.tsx      # Weather layer legend
│   │   ├── SidePanel.tsx      # Air quality side panel
│   │   ├── WeatherIcon.tsx    # Dynamic weather icons
│   │   ├── LightDarkToggle.tsx# Theme toggle component
│   │   ├── MobileHeader.tsx   # Mobile navigation header
│   │   ├── ThemeProvider.tsx  # Theme context provider
│   │   ├── cards/
│   │   │   ├── Card.tsx       # Reusable card component
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── DailyForecast.tsx
│   │   │   ├── HourlyForecast.tsx
│   │   │   └── AdditionalInfo.tsx
│   │   ├── dropdowns/
│   │   │   ├── LocationDropdown.tsx
│   │   │   └── MapTypeDropdown.tsx
│   │   ├── skeletons/         # Loading skeleton components
│   │   └── ui/                # Radix UI components
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── schemas/               # Zod validation schemas
│       ├── weatherSchema.ts
│       ├── geocodeSchema.ts
│       └── airPollutionSchema.ts
├── .env.example               # Environment variables template
├── package.json               # Project dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
└── README.md                  # Project documentation
```

---

## ⚙️ How It Works

### Data Fetching with TanStack Query
The project uses TanStack Query for efficient data management:

```typescript
// Weather data fetching with caching
const { data } = useSuspenseQuery({
  queryKey: ["weather", coords],
  queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
})
```

### Interactive Map Implementation
```typescript
// Click anywhere on the map to get weather
const onMapClick = (lat: number, lon: number) => {
  setCoords({ lat, lon })
  setLocation("custom")
}

// Multiple weather layers available
<WeatherOverlay mapType={mapType} /> // clouds, temp, precipitation, wind
```

### Air Quality Monitoring
```typescript
// Real-time AQI from WAQI API
const { data } = useSuspenseQuery({
  queryKey: ["pollution", coords],
  queryFn: () => getAirPollution(coords),
})
// Displays: CO, NO₂, O₃, SO₂, PM2.5, PM10 with quality indicators
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- API Keys (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Niteshagarwal01/Weathrly.git
   cd Weathrly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Keys**

   **WeatherAPI.com** (Weather & Forecasts):
   - Visit: https://www.weatherapi.com/signup.aspx
   - Sign up for free (1M calls/month)
   - Copy your API key

   **WAQI** (Air Quality Index):
   - Visit: https://aqicn.org/data-platform/token/
   - Fill the form with your details
   - Check your email for the API token

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your API keys:
   ```env
   VITE_WEATHER_API_KEY=your_weatherapi_key_here
   VITE_WAQI_API_KEY=your_waqi_token_here
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open http://localhost:5173 in your browser

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

---

## 🎨 Customization

### Theme Customization
Modify colors in your Tailwind configuration:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'weather-blue': '#3B82F6',
        'weather-orange': '#F97316',
      },
    },
  },
};
```

### Environment Variables
```env
VITE_WEATHER_API_KEY=your_weatherapi_key
VITE_WAQI_API_KEY=your_waqi_token
```

---

## 📊 Performance Optimizations

| Optimization | Description |
|--------------|-------------|
| **Suspense Boundaries** | Graceful loading states with skeleton components |
| **Lazy Loading** | Components loaded on demand |
| **Query Caching** | TanStack Query smart caching and background sync |
| **Code Splitting** | Optimized bundle with Vite |
| **Memoization** | Efficient re-renders with React patterns |

---

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables:
   - `VITE_WEATHER_API_KEY`
   - `VITE_WAQI_API_KEY`
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Import project on [Netlify](https://www.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

---

## ⚠️ Limitations & Roadmap

### Current Limitations
- Requires API keys for weather and air quality data
- Weather layers depend on third-party tile servers
- Basic error handling for network failures

### Planned Features
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Multiple location favorites
- [ ] Weather widgets
- [ ] PWA support for offline access
- [ ] Unit conversion (°F/°C, mph/km/h)
- [ ] Comprehensive test suite
- [ ] Localization support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs and issues
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Nitesh Agarwal**
- GitHub: [@Niteshagarwal01](https://github.com/Niteshagarwal01)

---

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Air quality data from [WAQI](https://aqicn.org/)
- Map tiles from [CartoDB](https://carto.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

<p align="center">
  Built with ❤️ using React + TypeScript + Vite
</p>
