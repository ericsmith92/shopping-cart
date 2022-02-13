import { MAX_TITLE_LENGTH } from "../constants"

export const clipTitle = (title: string): string => {
  return title.length <= MAX_TITLE_LENGTH ? title : `${title.substring(0, 40)}...`
}