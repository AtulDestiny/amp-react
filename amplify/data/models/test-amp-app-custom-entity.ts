import {
  a,
} from '@aws-amplify/backend';

export const TestAmpAppCustomEntity = a.model({
  id: a
    .STRING()
                .authorization((allow: any) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),
  name: a
    .STRING()
                .authorization((allow: any) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),
  
})
.authorization((allow: any) => [
  allow.publicApiKey().to(['read']),
  allow.authenticated().to(['read']),
]);
