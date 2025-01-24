import { formatTime } from "../../../utils/format-time-utils"

describe('formatTime', () => {
  it('should be return time formatted in HH:mm', async () => {
    formatTime(12, 0);
    expect(formatTime(12, 0)).toBe("12:00")
  })
})