// 날짜를 'YYYY-MM-DD' 형식으로 반환
export const formatKSTDate = (date) =>
  new Date(date).toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\. /g, '-').replace('.', '')

// 시간을 'YYYY-MM-DD HH:MM:SS.sss' 형식으로 반환
export const getKSTDateTimeStringWithMs = (date) =>
  new Date(date.getTime() + 9 * 60 * 60 * 1000) // UTC+9 시간차 적용
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')