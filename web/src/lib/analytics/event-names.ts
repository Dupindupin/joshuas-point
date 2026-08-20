export const analyticsEvents = {
  contactEmailClicked: 'Contact Email Clicked',
  enquirySubmitted: 'Enquiry Submitted',
  planYourStayViewed: 'Plan Your Stay Viewed',
  subscriptionConfirmed: 'Subscription Confirmed',
} as const

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents]
