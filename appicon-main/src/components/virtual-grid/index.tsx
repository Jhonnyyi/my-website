import { Fragment, useEffect, useRef, useState } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'
import { throttle } from 'lodash-es'

import { LIST_ICON_SIZE } from '@/constants/icon-size'

import { Error } from '../error'
import { Loading } from '../loading'

const LIST_GAP = 48

export interface VirtualGridProps<T> {
  className?: string
  data: T[]
  error?: boolean
  loading?: boolean
  onScroll?: () => void
  renderItem: (item: T) => React.ReactNode
}

export const VirtualGrid = <T,>(props: VirtualGridProps<T>) => {
  const { className, data, error, loading, onScroll, renderItem } = props
  const [columnCount, setColumnCount] = useState(4)
  const parentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!parentRef.current) return

    const updateColumnCount = () => {
      const itemTotalWidth = LIST_ICON_SIZE + LIST_GAP
      const availableWidth =
        parentRef.current!.getBoundingClientRect().width - LIST_GAP
      const columns = Math.max(1, Math.floor(availableWidth / itemTotalWidth))
      setColumnCount(columns)
    }

    updateColumnCount()
    const throttledUpdateColumnCount = throttle(updateColumnCount, 100)

    const resizeObserver = new ResizeObserver(throttledUpdateColumnCount)

    resizeObserver.observe(parentRef.current)
    window.addEventListener('resize', throttledUpdateColumnCount)
    return () => {
      window.removeEventListener('resize', throttledUpdateColumnCount)
      resizeObserver.disconnect()
    }
  }, [])

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(data.length / columnCount),
    overscan: 2,
    estimateSize: () => LIST_ICON_SIZE + LIST_GAP,
    getScrollElement: () => parentRef.current,
  })

  let content: React.ReactNode = null

  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <Error />
  } else {
    content = (
      <div
        className='relative w-full'
        style={{
          height: `${rowVirtualizer.getTotalSize() - LIST_GAP}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className='absolute left-0 top-0 grid w-full place-items-center'
            style={{
              gap: LIST_GAP,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              height: LIST_ICON_SIZE,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {data
              .slice(
                virtualRow.index * columnCount,
                (virtualRow.index + 1) * columnCount,
              )
              .map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={`${item}-${index}`}>{renderItem(item)}</Fragment>
              ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={parentRef} className={className} onScroll={onScroll}>
      {content}
    </div>
  )
}
