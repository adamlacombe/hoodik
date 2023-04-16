import * as api from './api'
import * as auth from './auth'
import * as crypto from './cryptfns'
export { auth, crypto, api }
import { parseISO, format as f } from 'date-fns'

const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"

/**
 * Takes the UTC date and creates a local date
 * @throws
 */
export function localDateFromUtcString(utc?: string | Date | null): Date {
  if (!utc || new Date(utc as string).toDateString() === 'Invalid Date') {
    throw new Error('Invalid date')
  }

  if (typeof utc === 'string') {
    return parseISO(`${utc}Z`)
  }

  return utc
}

/**
 * Takes the LOCAL date and creates an UTC date
 */
export function utcStringFromLocal(local?: string | Date): string {
  return format(local || new Date(), DATE_FORMAT)
}

/**
 * Make the format function bit more versatile
 * @throws
 */
export function format(date: Date | string, formatString?: string): string {
  if (!date || typeof date === 'string') {
    date = localDateFromUtcString(date)
  }

  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)

  return f(date, formatString || DATE_FORMAT)
}
