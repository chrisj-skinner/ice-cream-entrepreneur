// Weather constants and formatting helpers
export const WEATHER_ICONS = {
  sunny: '☀️',
  cloudy: '☁️',
};

export function formatWeatherRecap(levelData) {
  return `${WEATHER_ICONS[levelData.weather]} ${levelData.weatherText} | ${
    levelData.preBookedVisitors
  } Pre-Booked Visitors`;
}
