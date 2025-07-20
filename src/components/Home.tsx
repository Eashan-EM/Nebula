'use client'

import React, { useEffect, useState } from 'react'

type Satellite = {
	id: number
    name: string
}

type SatInfo = {
	name: string
    id: number
    latitude: number
    longitude: number
    altitude: number
    velocity: number
    visibility: string
    footprint: number
    timestamp: number
}

type MarsWeather = {
	[sol: string]: any
}

type AsteroidFeed = {
	element_count: number
    near_earth_objects: Record<string, any[]>
}

const ISS_ID = 25544
const ISS_TIMESTAMPS = [1753013220, 1753013210, 1753013200]
const AST_START = '2015-09-07'
const AST_END = '2015-09-08'

export default function Home() {
	const [satellites, setSatellites] = useState<Satellite[] | null>(null)
    const [satInfo, setSatInfo] = useState<SatInfo | null>(null)
    const [satPositions, setSatPositions] = useState<any[] | null>(null)
    const [marsWeather, setMarsWeather] = useState<MarsWeather | null>(null)
    const [asteroids, setAsteroids] = useState<AsteroidFeed | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    
	useEffect(() => {
		async function fetchData() {
			setLoading(true)
            setError(null)
            try {
		        const satsRes = await fetch('https://api.wheretheiss.at/v1/satellites')
                if (!satsRes.ok) throw new Error('Failed to fetch satellites')
                    const sats = await satsRes.json()
                setSatellites(sats)
                
				// Fetch ISS info
				const issRes = await fetch(`https://api.wheretheiss.at/v1/satellites/${ISS_ID}`)
                if (!issRes.ok) throw new Error('Failed to fetch ISS info')
                    setSatInfo(await issRes.json())
                
				// Fetch ISS positions
				const posRes = await fetch(`https://api.wheretheiss.at/v1/satellites/${ISS_ID}/positions?timestamps=${ISS_TIMESTAMPS.join(',')}`)
                if (!posRes.ok) throw new Error('Failed to fetch ISS positions')
                    setSatPositions(await posRes.json())
                
				// Fetch Mars weather
				const marsRes = await fetch('https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0')
                if (!marsRes.ok) throw new Error('Failed to fetch Mars weather')
                    setMarsWeather(await marsRes.json())
                
				// Fetch asteroid info
				const astRes = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${AST_START}&end_date=${AST_END}&api_key=DEMO_KEY`)
                if (!astRes.ok) throw new Error('Failed to fetch asteroid info')
                    setAsteroids(await astRes.json())
            } catch (err: any) {
				setError(err.message || 'Unknown error')
            } finally {
				setLoading(false)
            }
		}
		fetchData()
    }, [])
    
	return <div className="text-white p-6">
		<div className="max-w-4xl mx-auto space-y-8">
			<h1 className="text-4xl font-bold text-center mb-8">Nebula Space Dashboard</h1>
			{loading && <div className="text-center text-lg">Loading data...</div>}
			{error && <div className="text-center text-red-400">Error: {error}</div>}
			{!loading && !error && <>
		        <section className="bg-gray-800/80 rounded-lg shadow p-6 backdrop-blur-sm">
					<h2 className="text-2xl font-semibold mb-4">All Satellites</h2>
					<div className="overflow-x-auto max-h-48">
						<table className="min-w-full text-sm">
							<thead>
								<tr>
								<th className="px-2 py-1 text-left">ID</th>
								<th className="px-2 py-1 text-left">Name</th>
								</tr>
							</thead>
							<tbody>
                                {satellites?.slice(0, 10).map((sat) => (
                                    <tr key={sat.id} className="odd:bg-gray-700">
                                        <td className="px-2 py-1">{sat.id}</td>
                                        <td className="px-2 py-1">{sat.name}</td>
                                    </tr>
                                ))}
							</tbody>
						</table>
                        {satellites && satellites.length > 10 && (
                            <div className="text-xs text-gray-400 mt-2">...and {satellites.length - 10} more</div>
                        )}
					</div>
				</section>

		        <section className="bg-gray-800/80 rounded-lg shadow p-6 backdrop-blur-sm" id="iss">
					<h2 className="text-2xl font-semibold mb-4">ISS (International Space Station) Info</h2>
					{satInfo ? (
                        <ul className="grid grid-cols-2 gap-2 text-sm">
                            <li><span className="font-semibold">Name:</span> {satInfo.name}</li>
                            <li><span className="font-semibold">ID:</span> {satInfo.id}</li>
                            <li><span className="font-semibold">Latitude:</span> {satInfo.latitude}</li>
                            <li><span className="font-semibold">Longitude:</span> {satInfo.longitude}</li>
                            <li><span className="font-semibold">Altitude:</span> {satInfo.altitude} km</li>
                            <li><span className="font-semibold">Velocity:</span> {satInfo.velocity} km/h</li>
                            <li><span className="font-semibold">Visibility:</span> {satInfo.visibility}</li>
                            <li><span className="font-semibold">Footprint:</span> {satInfo.footprint}</li>
                            <li><span className="font-semibold">Timestamp:</span> {satInfo.timestamp}</li>
                        </ul>
                    ) : <div>Loading ISS info...</div>}
                </section>

		        <section className="bg-gray-800/80 rounded-lg shadow p-6 backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-4">ISS Positions (Sample Timestamps)</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-2 py-1">Timestamp</th>
                                    <th className="px-2 py-1">Latitude</th>
                                    <th className="px-2 py-1">Longitude</th>
                                    <th className="px-2 py-1">Altitude (km)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {satPositions?.map((pos, i) => (
                                    <tr key={i} className="odd:bg-gray-700">
                                        <td className="px-2 py-1">{pos.timestamp}</td>
                                        <td className="px-2 py-1">{pos.latitude}</td>
                                        <td className="px-2 py-1">{pos.longitude}</td>
                                        <td className="px-2 py-1">{pos.altitude}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

		        <section className="bg-gray-800/80 rounded-lg shadow p-6 backdrop-blur-sm" id="mars">
                    <h2 className="text-2xl font-semibold mb-4">Mars Weather (NASA InSight)</h2>
                    {marsWeather ? (
                        <div className="text-sm">
                            {Object.keys(marsWeather).filter(k => k.match(/^\d+$/)).length === 0 && (
                                <div>No weather data available.</div>
                            )}
                            {Object.keys(marsWeather).filter(k => k.match(/^\d+$/)).slice(0, 2).map((sol) => (
                                <div key={sol} className="mb-2">
                                    <div className="font-semibold">Sol {sol}</div>
                                    <div>Avg Temp: {marsWeather[sol]?.AT?.av ?? 'N/A'} °C</div>
                                    <div>Wind Speed: {marsWeather[sol]?.HWS?.av ?? 'N/A'} m/s</div>
                                    <div>Pressure: {marsWeather[sol]?.PRE?.av ?? 'N/A'} Pa</div>
                                </div>
                            ))}
                        </div>
                    ) : <div>Loading Mars weather...</div>}
                </section>

		        <section className="bg-gray-800/80 rounded-lg shadow p-6 backdrop-blur-sm" id="asteroids">
                    <h2 className="text-2xl font-semibold mb-4">Asteroid Info (Near-Earth Objects)</h2>
                    {asteroids ? (
                        <div className="text-sm">
                            <div>Total NEOs: {asteroids.element_count}</div>
                            {Object.entries(asteroids.near_earth_objects).map(([date, objs]) => (
                                <div key={date} className="mt-2">
                                    <div className="font-semibold">Date: {date}</div>
                                    <ul className="list-disc ml-6">
                                        {objs.slice(0, 2).map((obj: any) => (
                                            <li key={obj.id}>
                                                <span className="font-semibold">{obj.name}</span> - Diameter: {obj.estimated_diameter.meters.estimated_diameter_max.toFixed(1)} m, Hazardous: {obj.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                                            </li>
                                        ))}
                                        {objs.length > 2 && <li>...and {objs.length - 2} more</li>}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ) : <div>Loading asteroid info...</div>}
                </section>
			</>}
		</div>
	</div>
}