import { tw } from 'tw-styled'

import { StyleField } from '../settings/common/style-field'

export const StyleFieldSubgrid = tw(StyleField)`col-span-2 grid-cols-subgrid`
export const SettingsContainer = tw.div`grid grid-cols-[auto_1fr] gap-4 p-2`
