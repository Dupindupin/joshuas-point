import type {DocumentActionComponent} from 'sanity'

const protectedActions = new WeakMap<DocumentActionComponent, DocumentActionComponent>()

/**
 * Keeps The House unpublished until its editorial workflow has reached Approved.
 * Schema validation remains responsible for the section-level readiness checks.
 */
export function protectHousePublishAction(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  const cachedAction = protectedActions.get(originalAction)
  if (cachedAction) return cachedAction

  const protectedAction: DocumentActionComponent = (props) => {
    const action = originalAction(props)
    if (!action || props.draft?.workflowStatus === 'approved') return action

    return {
      ...action,
      disabled: true,
      label: 'Approve before publishing',
      title: 'Set Workflow Status to Approved before publishing The House.',
    }
  }

  protectedAction.action = originalAction.action
  protectedAction.displayName = 'ProtectedHousePublishAction'
  protectedActions.set(originalAction, protectedAction)

  return protectedAction
}
