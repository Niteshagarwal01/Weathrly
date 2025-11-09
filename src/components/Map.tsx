import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import type { Coords } from "../types"
import { useEffect } from "react"

// Fix for default marker icon in production
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

type Props = {
  coords: Coords
  onMapClick: (lat: number, lon: number) => void
  mapType: string
}

export default function Map({ coords, onMapClick, mapType }: Props) {
  const { lat, lon } = coords
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "100%", height: "100%" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      {/* Using CartoDB - Clean English labels, completely FREE! */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      {/* Weather overlay using RainViewer - FREE! */}
      {mapType !== 'none' && (
        <WeatherOverlay mapType={mapType} />
      )}
      <Marker position={[lat, lon]} />
    </MapContainer>
  )
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (lat: number, lon: number) => void
  coords: Coords
}) {
  const map = useMap()
  map.panTo([coords.lat, coords.lon])

  map.on("click", (e) => {
    const { lat, lng } = e.latlng
    onMapClick(lat, lng)
  })

  return null
}

function WeatherOverlay({ mapType }: { mapType: string }) {
  const map = useMap()

  useEffect(() => {
    // Using RainViewer for free weather radar
    const timestamp = Math.floor(Date.now() / 1000)
    let url = ''
    
    switch (mapType) {
      case 'precipitation_new':
      case 'rain':
        url = `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/1_1.png`
        break
      case 'clouds_new':
      case 'clouds':
        url = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=60e58c2eb919e720fa0b3c2e67e67c8f`
        break
      case 'temp_new':
      case 'temperature':
        url = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=60e58c2eb919e720fa0b3c2e67e67c8f`
        break
      case 'pressure_new':
      case 'pressure':
        url = `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=60e58c2eb919e720fa0b3c2e67e67c8f`
        break
      case 'wind_new':
      case 'wind':
        url = `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=60e58c2eb919e720fa0b3c2e67e67c8f`
        break
      default:
        return
    }

    const overlay = new L.TileLayer(url, {
      opacity: 0.6,
      attribution: 'Weather data'
    })
    
    overlay.addTo(map)

    return () => {
      map.removeLayer(overlay)
    }
  }, [map, mapType])

  return null
}

