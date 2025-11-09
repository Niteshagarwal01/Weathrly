# 🌤️ Weathrly - Weather Dashboard

A modern, real-time weather dashboard built with React, TypeScript, and Vite. Track weather conditions, forecasts, and air quality with an interactive map interface.

![Weathrly Dashboard](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.11-purple?logo=vite)

## ✨ Features

- 🌍 **GPS Location Tracking** - Automatically detect your current location
- 🗺️ **Interactive Map** - Click anywhere to view weather data with multiple layer options (clouds, temperature, precipitation, wind)
- 🌡️ **Current Weather** - Real-time temperature, humidity, wind speed, and conditions
- ⏰ **48-Hour Forecast** - Detailed hourly weather predictions
- 📅 **8-Day Forecast** - Extended daily weather outlook
- 💨 **Air Quality Index** - Real-time AQI data from WAQI (World Air Quality Index)
- 🌓 **Dark/Light Mode** - Toggle between themes
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.11
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS 4.1.15
- **UI Components**: Radix UI
- **Maps**: Leaflet & React-Leaflet
- **Validation**: Zod

## 🔑 API Services

- **Weather Data**: [WeatherAPI.com](https://www.weatherapi.com/) (1M free calls/month)
- **Air Quality**: [WAQI (World Air Quality Index)](https://aqicn.org/) (Free)
- **Map Tiles**: CartoDB Voyager (Free, English labels)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API Keys (see Setup section)

## ⚙️ Setup & Installation

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
   - Fill the form with your name, email, and project description
   - Check your email for the API token

4. **Create `.env` file**
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

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `VITE_WEATHER_API_KEY`
   - `VITE_WAQI_API_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import project on [Netlify](https://www.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify dashboard
6. Deploy!

## 🎨 Features in Detail

### Weather Data
- **Current Conditions**: Temperature (°C), feels like, humidity, wind speed (m/s)
- **Hourly Forecast**: 48-hour detailed predictions
- **Daily Forecast**: 8-day outlook with min/max temperatures
- **Additional Info**: Cloudiness, UV index, wind direction, pressure, sunrise/sunset

### Air Quality
- **Real-time AQI**: Accurate data from WAQI monitoring stations
- **Pollutant Breakdown**: CO, NO₂, O₃, SO₂, PM2.5, PM10
- **Quality Levels**: Good, Fair, Moderate, Poor, Very Poor indicators

### Interactive Map
- **Weather Layers**: Clouds, temperature, precipitation, wind
- **Click-to-View**: Click anywhere on the map to get weather for that location
- **Layer Control**: Toggle between different weather overlays

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nitesh Agarwal**
- GitHub: [@Niteshagarwal01](https://github.com/Niteshagarwal01)

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Air quality data from [WAQI](https://aqicn.org/)
- Map tiles from [CartoDB](https://carto.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ using React + TypeScript + Vite
