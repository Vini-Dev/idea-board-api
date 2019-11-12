import { format, utcToZonedTime } from 'date-fns-tz';

const now = () => {
  const nowDate = new Date();
  const spDate = utcToZonedTime(nowDate, 'America/Sao_Paulo');
  return format(spDate, 'yyyy-MM-dd HH:mm:ss', {
    timeZone: 'America/Sao_Paulo',
  });
};

export default { now };
