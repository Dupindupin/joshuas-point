import {Card, Text} from '@sanity/ui'
import type {ArrayOfObjectsInputProps, ImageInputProps} from 'sanity'

function PhotographyStillNeeded() {
  return (
    <Card border padding={3} radius={2} tone="caution">
      <Text size={1} weight="medium">
        Photography still needed
      </Text>
    </Card>
  )
}

export function EditorialPhotoArrayInput(props: ArrayOfObjectsInputProps) {
  return (
    <div style={{display: 'grid', gap: '0.75rem'}}>
      {props.renderDefault(props)}
      {!props.value?.length ? <PhotographyStillNeeded /> : null}
    </div>
  )
}

export function EditorialPhotoImageInput(props: ImageInputProps) {
  return (
    <div style={{display: 'grid', gap: '0.75rem'}}>
      {props.renderDefault(props)}
      {!props.value?.asset ? <PhotographyStillNeeded /> : null}
    </div>
  )
}
