import { AirPollutionSchema } from "./schemas/airPollutionSchema"
import { GeocodeSchema } from "./schemas/geocodeSchema"
import { weatherSchema } from "./schemas/weatherSchema"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=8&aqi=yes&alerts=no`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'Failed to fetch weather data')
  
  // Helper to convert time string to epoch
  const parseTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr)
    const timeParts = timeStr.match(/(\d+):(\d+) (AM|PM)/)
    if (timeParts) {
      let hours = parseInt(timeParts[1])
      const minutes = parseInt(timeParts[2])
      const period = timeParts[3]
      if (period === 'PM' && hours !== 12) hours += 12
      if (period === 'AM' && hours === 12) hours = 0
      date.setHours(hours, minutes, 0, 0)
      return Math.floor(date.getTime() / 1000)
    }
    // Fallback to current time if parsing fails
    return Math.floor(Date.now() / 1000)
  }
  
  const transformedData = {
    lat: data.location.lat,
    lon: data.location.lon,
    timezone: data.location.tz_id,
    timezone_offset: 0,
    current: {
      dt: data.location.localtime_epoch,
      sunrise: parseTime(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunrise),
      sunset: parseTime(data.forecast.forecastday[0].date, data.forecast.forecastday[0].astro.sunset),
      temp: data.current.temp_c,
      feels_like: data.current.feelslike_c,
      pressure: data.current.pressure_mb,
      humidity: data.current.humidity,
      dew_point: data.current.temp_c - ((100 - data.current.humidity) / 5),
      uvi: data.current.uv,
      clouds: data.current.cloud,
      visibility: data.current.vis_km * 1000,
      wind_speed: data.current.wind_kph / 3.6,
      wind_deg: data.current.wind_degree,
      wind_gust: data.current.gust_kph / 3.6,
      weather: [{ id: data.current.condition.code, main: data.current.condition.text, description: data.current.condition.text.toLowerCase(), icon: '01d' }],
    },
    hourly: data.forecast.forecastday.flatMap((day: any) => day.hour.map((hour: any) => ({
      dt: hour.time_epoch, 
      temp: hour.temp_c, 
      feels_like: hour.feelslike_c, 
      pressure: hour.pressure_mb,
      humidity: hour.humidity, 
      dew_point: hour.dewpoint_c, 
      uvi: hour.uv, 
      clouds: hour.cloud,
      visibility: hour.vis_km * 1000, 
      wind_speed: hour.wind_kph / 3.6, 
      wind_deg: hour.wind_degree,
      wind_gust: hour.gust_kph / 3.6, 
      weather: [{ id: hour.condition.code, main: hour.condition.text, description: hour.condition.text.toLowerCase(), icon: '01d' }],
      pop: hour.chance_of_rain / 100
    }))).slice(0, 48),
    daily: data.forecast.forecastday.map((day: any, index: number) => ({
      dt: day.date_epoch, 
      sunrise: parseTime(day.date, day.astro.sunrise),
      sunset: parseTime(day.date, day.astro.sunset),
      moonrise: 0, 
      moonset: 0, 
      moon_phase: 0, 
      summary: day.day.condition.text,
      temp: { 
        day: day.day.avgtemp_c, 
        min: day.day.mintemp_c, 
        max: day.day.maxtemp_c, 
        night: day.day.mintemp_c, 
        eve: day.day.avgtemp_c, 
        morn: day.day.mintemp_c 
      },
      feels_like: { 
        day: day.day.avgtemp_c, 
        night: day.day.mintemp_c, 
        eve: day.day.avgtemp_c, 
        morn: day.day.mintemp_c 
      },
      pressure: index === 0 ? data.current.pressure_mb : 1013, 
      humidity: day.day.avghumidity,
      dew_point: day.day.avgtemp_c - ((100 - day.day.avghumidity) / 5), 
      wind_speed: day.day.maxwind_kph / 3.6,
      wind_deg: 0, 
      wind_gust: day.day.maxwind_kph / 3.6,
      weather: [{ id: day.day.condition.code, main: day.day.condition.text, description: day.day.condition.text.toLowerCase(), icon: '01d' }],
      clouds: index === 0 ? data.current.cloud : 0, 
      pop: day.day.daily_chance_of_rain / 100, 
      rain: day.day.totalprecip_mm, 
      uvi: day.day.uv
    }))
  }
  return weatherSchema.parse(transformedData)
}

export async function getGeocode(location: string) {
  const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(location)}`)
  const data = await res.json()
  if (!res.ok || !data || data.length === 0) throw new Error('Failed to fetch geocode data')
  const transformed = data.map((result: any) => ({ name: result.name, local_names: { en: result.name }, lat: result.lat, lon: result.lon, country: result.country, state: result.region || '' }))
  return GeocodeSchema.parse(transformed)
}

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  // Use WAQI (World Air Quality Index) for accurate real-time AQI data
  const res = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_API_KEY}`)
  const data = await res.json()
  
  if (data.status !== 'ok') {
    throw new Error('Failed to fetch air pollution data from WAQI')
  }
  
  const aqiValue = data.data.aqi
  const iaqi = data.data.iaqi || {}
  
  // Map AQI to 1-5 scale for display
  let aqiCategory = 1
  if (aqiValue <= 50) aqiCategory = 1      // Good
  else if (aqiValue <= 100) aqiCategory = 2 // Moderate
  else if (aqiValue <= 150) aqiCategory = 3 // Unhealthy for Sensitive Groups
  else if (aqiValue <= 200) aqiCategory = 4 // Unhealthy
  else aqiCategory = 5                      // Very Unhealthy/Hazardous
  
  const transformed = {
    coord: { lon, lat },
    list: [{ 
      main: { aqi: aqiCategory }, 
      components: { 
        co: iaqi.co?.v || 0, 
        no: iaqi.no?.v || 0, 
        no2: iaqi.no2?.v || 0, 
        o3: iaqi.o3?.v || 0, 
        so2: iaqi.so2?.v || 0, 
        pm2_5: aqiValue, // Use actual AQI value from WAQI
        pm10: iaqi.pm10?.v || 0, 
        nh3: iaqi.nh3?.v || 0 
      }, 
      dt: Math.floor(Date.now() / 1000)
    }]
  }
  
  return AirPollutionSchema.parse(transformed)
}
