# TassiaQCA Folder Structure

Generated on: 2026-08-18

```bash
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   ├── config/
│   │   │   │   └── environment.js
│   │   │   ├── guards/
│   │   │   ├── hooks/
│   │   │   ├── layouts/
│   │   │   ├── providers/
│   │   │   │   └── AppProviders.jsx
│   │   │   └── router/
│   │   │       ├── AppRouter.jsx
│   │   │       └── RouterConfiguration.jsx
│   │   ├── applications/
│   │   │   ├── administration/
│   │   │   │   ├── components/
│   │   │   │   ├── layouts/
│   │   │   │   ├── pages/
│   │   │   │   └── routes/
│   │   │   │       └── administration.routes.jsx
│   │   │   ├── authentication/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthCard.jsx
│   │   │   │   │   ├── AuthFooter.jsx
│   │   │   │   │   ├── AuthHeader.jsx
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   └── RegisterForm.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── useLoginForm.js
│   │   │   │   │   └── useRegisterForm.js
│   │   │   │   ├── layouts/
│   │   │   │   │   └── AuthLayout.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   ├── LoginPage.jsx
│   │   │   │   │   └── RegisterPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   └── authentication.routes.jsx
│   │   │   │   └── index.js
│   │   │   ├── business/
│   │   │   │   ├── components/
│   │   │   │   │   └── SidebarNavigation.jsx
│   │   │   │   ├── hub/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── BusinessCard.jsx
│   │   │   │   │   │   ├── BusinessList.jsx
│   │   │   │   │   │   ├── EmptyState.jsx
│   │   │   │   │   │   ├── HubHeader.jsx
│   │   │   │   │   │   └── QuickActions.jsx
│   │   │   │   │   ├── hooks/
│   │   │   │   │   │   └── useBusinessHub.js
│   │   │   │   │   ├── pages/
│   │   │   │   │   │   └── BusinessHubPage.jsx
│   │   │   │   │   └── services/
│   │   │   │   │       └── business.service.js
│   │   │   │   ├── layouts/
│   │   │   │   │   └── BusinessLayout.jsx
│   │   │   │   ├── modules/
│   │   │   │   │   └── moduleRegistry.js
│   │   │   │   ├── onboarding/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── BusinessIdentityStep.jsx
│   │   │   │   │   │   ├── BusinessInformationForm.jsx
│   │   │   │   │   │   ├── BusinessTypeCard.jsx
│   │   │   │   │   │   ├── BusinessTypeSelector.jsx
│   │   │   │   │   │   ├── OnboardingLayout.jsx
│   │   │   │   │   │   ├── OnboardingWizard.jsx
│   │   │   │   │   │   ├── ProgressIndicator.jsx
│   │   │   │   │   │   ├── ReviewStep.jsx
│   │   │   │   │   │   └── SuccessStep.jsx
│   │   │   │   │   ├── context/
│   │   │   │   │   │   ├── BusinessOnboardingContext.jsx
│   │   │   │   │   │   └── BusinessOnboardingProvider.jsx
│   │   │   │   │   ├── hooks/
│   │   │   │   │   │   └── useBusinessOnboarding.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   └── onboarding.routes.jsx
│   │   │   │   │   ├── services/
│   │   │   │   │   │   └── onboarding.service.js
│   │   │   │   │   ├── BusinessOnboardingPage.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── onboardingSteps.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── business.routes.jsx
│   │   │   │   ├── workspaces/
│   │   │   │   │   ├── BusinessWorkspace.jsx
│   │   │   │   │   └── WorkspaceRouteRenderer.jsx
│   │   │   │   └── index.js
│   │   │   ├── gateway/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ActionGrid.jsx
│   │   │   │   │   ├── CTASection.jsx
│   │   │   │   │   ├── FooterSection.jsx
│   │   │   │   │   ├── HeroSection.jsx
│   │   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   │   ├── JourneySection.jsx
│   │   │   │   │   ├── PlatformOverviewSection.jsx
│   │   │   │   │   └── TestimonialsSection.jsx
│   │   │   │   ├── data/
│   │   │   │   │   ├── howItWorks.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── journeys.js
│   │   │   │   │   ├── platformOverview.js
│   │   │   │   │   └── testimonials.js
│   │   │   │   ├── layouts/
│   │   │   │   │   └── GatewayLayout.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   └── GatewayPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   └── gateway.routes.jsx
│   │   │   │   └── index.js
│   │   │   └── marketplace/
│   │   │       ├── components/
│   │   │       ├── layouts/
│   │   │       ├── pages/
│   │   │       ├── routes/
│   │   │       │   └── marketplace.routes.jsx
│   │   │       └── index.js
│   │   ├── platform/
│   │   │   ├── api/
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── auth.interceptor.js
│   │   │   │   │   └── response.interceptor.js
│   │   │   │   ├── apiClient.js
│   │   │   │   ├── index.js
│   │   │   │   └── request.service.js
│   │   │   ├── auth/
│   │   │   ├── bootstrap/
│   │   │   │   ├── components/
│   │   │   │   │   ├── BootstrapEngine.jsx
│   │   │   │   │   └── BootstrapLoader.jsx
│   │   │   │   ├── context/
│   │   │   │   │   ├── BootstrapContext.jsx
│   │   │   │   │   └── BootstrapProvider.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useBootstrap.js
│   │   │   │   ├── pages/
│   │   │   │   │   └── BootstrapPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   └── bootstrap.routes.jsx
│   │   │   │   └── index.js
│   │   │   ├── capabilities/
│   │   │   ├── configuration/
│   │   │   │   └── configuration.service.js
│   │   │   ├── context/
│   │   │   │   ├── index.js
│   │   │   │   ├── PlatformContext.jsx
│   │   │   │   ├── PlatformProvider.jsx
│   │   │   │   └── usePlatform.js
│   │   │   ├── dashboard/
│   │   │   │   └── dashboard.service.js
│   │   │   ├── identity/
│   │   │   │   ├── identity.service.js
│   │   │   │   ├── IdentityContext.jsx
│   │   │   │   ├── IdentityProvider.jsx
│   │   │   │   ├── index.js
│   │   │   │   └── useIdentity.js
│   │   │   ├── journey/
│   │   │   │   ├── components/
│   │   │   │   │   └── JourneyLink.jsx
│   │   │   │   ├── constants/
│   │   │   │   │   └── platformIntents.js
│   │   │   │   ├── context/
│   │   │   │   │   ├── JourneyContext.jsx
│   │   │   │   │   └── JourneyProvider.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useJourney.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── journeyResolver.js
│   │   │   │   │   └── journeySession.js
│   │   │   │   └── index.js
│   │   │   ├── navigation/
│   │   │   │   └── navigation.service.js
│   │   │   ├── permissions/
│   │   │   ├── registries/
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useBusinessTypes.js
│   │   │   │   ├── services/
│   │   │   │   │   └── registry.service.js
│   │   │   │   └── index.js
│   │   │   ├── routing/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthenticatedRoute.jsx
│   │   │   │   │   └── PublicRoute.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAuthenticatedRoute.js
│   │   │   │   │   └── usePublicRoute.js
│   │   │   │   └── index.js
│   │   │   ├── session/
│   │   │   │   ├── index.js
│   │   │   │   ├── sessionManager.js
│   │   │   │   └── tokenStorage.js
│   │   │   ├── widgets/
│   │   │   │   ├── engine/
│   │   │   │   │   └── WidgetRenderingEngine.jsx
│   │   │   │   ├── registry/
│   │   │   │   │   ├── registerWidgets.js
│   │   │   │   │   └── widgetRegistry.js
│   │   │   │   └── widgets/
│   │   │   │       ├── AlertWidget.jsx
│   │   │   │       ├── CalendarWidget.jsx
│   │   │   │       ├── CalenderWidget.jsx
│   │   │   │       ├── ChartWidget.jsx
│   │   │   │       ├── ListWidget.jsx
│   │   │   │       ├── StatWidget.jsx
│   │   │   │       ├── SummaryWidget.jsx
│   │   │   │       ├── TableWidget.jsx
│   │   │   │       └── UnknownWidget.jsx
│   │   │   └── workspace/
│   │   │       ├── api/
│   │   │       │   └── workspace.api.js
│   │   │       ├── context/
│   │   │       │   ├── WorkspaceContext.js
│   │   │       │   └── WorkspaceProvider.jsx
│   │   │       ├── hooks/
│   │   │       │   └── useWorkspace.js
│   │   │       ├── services/
│   │   │       │   ├── bootstrapSession.js
│   │   │       │   └── provisioning.service.js
│   │   │       ├── types/
│   │   │       │   └── workspace.initialState.js
│   │   │       └── index.js
│   │   ├── shared/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   └── LoadingScreen.jsx
│   │   │   ├── config/
│   │   │   │   └── platform.config.js
│   │   │   ├── constants/
│   │   │   ├── hooks/
│   │   │   ├── icons/
│   │   │   │   └── businessTypeIcons.js
│   │   │   ├── layout/
│   │   │   │   ├── FeatureGrid/
│   │   │   │   │   ├── FeatureGrid.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Hero/
│   │   │   │   │   ├── Hero.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── PageSection/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── PageSection.jsx
│   │   │   │   ├── SectionHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SectionHeader.jsx
│   │   │   │   └── index.js
│   │   │   ├── services/
│   │   │   ├── styles/
│   │   │   ├── ui/
│   │   │   │   ├── Badge/
│   │   │   │   │   ├── Badge.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.jsx
│   │   │   │   │   ├── button.styles.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Container/
│   │   │   │   │   ├── Container.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Form/
│   │   │   │   │   ├── Form.jsx
│   │   │   │   │   ├── FormActions.jsx
│   │   │   │   │   ├── FormError.jsx
│   │   │   │   │   ├── FormField.jsx
│   │   │   │   │   ├── FormHelperText.jsx
│   │   │   │   │   ├── FormInput.jsx
│   │   │   │   │   ├── FormLabel.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Input/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── TextInput.jsx
│   │   │   │   ├── Section/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Section.jsx
│   │   │   │   ├── Typography/
│   │   │   │   │   ├── Heading.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Text.jsx
│   │   │   │   └── index.js
│   │   │   └── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── scripts/
│   └── generate-structure.js
├── server/
│   ├── src/
│   │   ├── app/
│   │   │   ├── bootstrap/
│   │   │   │   └── database.js
│   │   │   ├── config/
│   │   │   │   ├── cloudinary.js
│   │   │   │   ├── cors.js
│   │   │   │   └── env.js
│   │   │   ├── middleware/
│   │   │   ├── routes/
│   │   │   │   └── api.js
│   │   │   ├── app.js
│   │   │   └── server.js
│   │   ├── modules/
│   │   │   ├── administration/
│   │   │   ├── analytics/
│   │   │   ├── audit/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── auditLog.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   └── AuditLog.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── auditActor.presenter.js
│   │   │   │   │   ├── auditLog.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   └── auditLog.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── audit.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   └── auditLog.service.js
│   │   │   │   └── index.js
│   │   │   ├── business/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── branch.controller.js
│   │   │   │   │   ├── branchAssignment.controller.js
│   │   │   │   │   ├── business.controller.js
│   │   │   │   │   ├── businessMember.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── Branch.js
│   │   │   │   │   ├── BranchAssignment.js
│   │   │   │   │   └── Business.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── branch.presenter.js
│   │   │   │   │   ├── branchAssignment.presenter.js
│   │   │   │   │   ├── business.presenter.js
│   │   │   │   │   ├── businessMember.presenter.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── role.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── branch.repository.js
│   │   │   │   │   ├── branchAssignment.repository.js
│   │   │   │   │   └── business.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── business.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── branch.service.js
│   │   │   │   │   ├── branchAssignment.service.js
│   │   │   │   │   ├── business.service.js
│   │   │   │   │   └── businessMember.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── assignBranchMemberRequestSchema.js
│   │   │   │   │   ├── branchParamsSchema.js
│   │   │   │   │   ├── changeMemberRoleRequestSchema.js
│   │   │   │   │   ├── createBranchRequestSchema.js
│   │   │   │   │   ├── createBusinessRequestSchema.js
│   │   │   │   │   ├── deactivateBranchAssignmentRequestSchema.js
│   │   │   │   │   ├── deactivateBranchRequestSchema.js
│   │   │   │   │   ├── deactivateMemberRequestSchema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── inviteMemberRequestSchema.js
│   │   │   │   │   ├── leaveBusinessRequestSchema.js
│   │   │   │   │   ├── reactivateBranchAssignmentRequestSchema.js
│   │   │   │   │   ├── reactivateBranchRequestSchema.js
│   │   │   │   │   ├── reactivateMemberRequestSchema.js
│   │   │   │   │   ├── removeMemberRequestSchema.js
│   │   │   │   │   ├── setPrimaryBranchAssignmentRequestSchema.js
│   │   │   │   │   ├── transferOwnershipRequestSchema.js
│   │   │   │   │   ├── updateBranchRequestSchema.js
│   │   │   │   │   └── updateBusinessSchema.js
│   │   │   │   └── index.js
│   │   │   ├── businessConfiguration/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── configuration.builder.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── errors/
│   │   │   │   │   ├── businessConfiguration.errors.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── models/
│   │   │   │   │   └── businessConfiguration.model.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── businessConfiguration.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   └── businessConfiguration.repository.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── businessConfiguration.service.js
│   │   │   │   │   ├── businessProvisioning.service.js
│   │   │   │   │   ├── configurationGenerator.service.js
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── commerce/
│   │   │   │   ├── adapters/
│   │   │   │   │   ├── booking.projection.js
│   │   │   │   │   ├── course.projection.js
│   │   │   │   │   ├── digitalDownload.projection.js
│   │   │   │   │   ├── event.projection.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── membership.projection.js
│   │   │   │   │   ├── package.projection.js
│   │   │   │   │   ├── product.projection.js
│   │   │   │   │   ├── rental.projection.js
│   │   │   │   │   ├── service.projection.js
│   │   │   │   │   └── subscription.projection.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── category.controller.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── product.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── Booking.js
│   │   │   │   │   ├── Category.js
│   │   │   │   │   ├── Course.js
│   │   │   │   │   ├── DigitalDownload.js
│   │   │   │   │   ├── Event.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Membership.js
│   │   │   │   │   ├── Package.js
│   │   │   │   │   ├── Product.js
│   │   │   │   │   ├── Rental.js
│   │   │   │   │   ├── Service.js
│   │   │   │   │   └── Subscription.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── category.presenter.js
│   │   │   │   │   └── product.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── booking.repository.js
│   │   │   │   │   ├── category.repository.js
│   │   │   │   │   ├── course.repository.js
│   │   │   │   │   ├── digitalDownload.repository.js
│   │   │   │   │   ├── event.repository.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── membership.repository.js
│   │   │   │   │   ├── package.repository.js
│   │   │   │   │   ├── product.repository.js
│   │   │   │   │   ├── rental.repository.js
│   │   │   │   │   ├── service.repository.js
│   │   │   │   │   └── subscription.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── category.routes.js
│   │   │   │   │   ├── product.routes.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── services/
│   │   │   │   │   ├── category.service.js
│   │   │   │   │   └── product.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── category.schema.js
│   │   │   │   │   └── product.validator.js
│   │   │   │   └── index.js
│   │   │   ├── communication/
│   │   │   ├── community/
│   │   │   ├── customer/
│   │   │   ├── dashboard/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── dashboard.builder.js
│   │   │   │   │   ├── dashboardResolver.builder.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── widgetSizes.js
│   │   │   │   │   └── widgetTypes.js
│   │   │   │   ├── controllers/
│   │   │   │   │   └── dashboard.controller.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── dashboard.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── dashboard.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── dashboard.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── validators/
│   │   │   │   │   └── dashboard.validator.js
│   │   │   │   └── index.js
│   │   │   ├── finance/
│   │   │   ├── identity/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── auth.controller.js
│   │   │   │   ├── middleware/
│   │   │   │   │   ├── authenticate.js
│   │   │   │   │   └── requirePermission.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── BusinessMember.js
│   │   │   │   │   ├── Permission.js
│   │   │   │   │   ├── Role.js
│   │   │   │   │   ├── Session.js
│   │   │   │   │   └── User.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── README.md
│   │   │   │   │   ├── session.presenter.js
│   │   │   │   │   └── user.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── businessMember.repository.js
│   │   │   │   │   ├── permission.repository.js
│   │   │   │   │   ├── README.md
│   │   │   │   │   ├── role.repository.js
│   │   │   │   │   ├── session.repository.js
│   │   │   │   │   └── user.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── auth.routes.js
│   │   │   │   ├── security/
│   │   │   │   │   ├── accessToken.service.js
│   │   │   │   │   ├── password.service.js
│   │   │   │   │   ├── README.md
│   │   │   │   │   ├── refreshToken.service.js
│   │   │   │   │   ├── session.service.js
│   │   │   │   │   └── tokenHasher.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.js
│   │   │   │   │   └── businessMember.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── loginRequestSchema.js
│   │   │   │   │   ├── logoutRequestSchema.js
│   │   │   │   │   ├── refreshRequestSchema.js
│   │   │   │   │   └── registerRequestSchema.js
│   │   │   │   ├── index.js
│   │   │   │   └── README.md
│   │   │   ├── navigation/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── navigation.builder.js
│   │   │   │   │   └── navigationResolver.builder.js
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigationSections.js
│   │   │   │   ├── controllers/
│   │   │   │   │   └── navigation.controller.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigation.presenter.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── navigation.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigation.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   └── navigation.validator.js
│   │   │   │   └── index.js
│   │   │   ├── offering/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offering.builder.js
│   │   │   │   │   └── offering.factory.js
│   │   │   │   ├── components/
│   │   │   │   │   ├── attributes/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── attributes.builder.js
│   │   │   │   │   │   │   ├── attributes.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── attributes.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── attributes.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── attributes.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── attributes.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── attributes.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── attributes.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── attributes.normalizer.js
│   │   │   │   │   │   │   ├── attributes.schema.js
│   │   │   │   │   │   │   ├── createAttributes.schema.js
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── setAttributesRequest.schema.js
│   │   │   │   │   │   │   └── updateAttributes.schema.js
│   │   │   │   │   │   ├── attributes.component.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── categories/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── categories.builder.js
│   │   │   │   │   │   │   ├── categories.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── categories.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── categories.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── categories.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── categories.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── categories.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── categories.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── categories.request.schema.js
│   │   │   │   │   │   │   ├── categories.schema.js
│   │   │   │   │   │   │   ├── createCategories.schema.js
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── updateCategories.schema.js
│   │   │   │   │   │   └── categories.component.js
│   │   │   │   │   ├── media/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── media.builder.js
│   │   │   │   │   │   │   └── media.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── media.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── media.request.schema.js
│   │   │   │   │   │   │   └── media.schema.js
│   │   │   │   │   │   └── media.component.js
│   │   │   │   │   ├── metadata/
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   └── metadata.schema.js
│   │   │   │   │   │   └── metadata.component.js
│   │   │   │   │   ├── pricing/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── pricing.builder.js
│   │   │   │   │   │   │   └── pricing.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── pricing.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── setCurrentPricing.schema.js
│   │   │   │   │   │   └── pricing.component.js
│   │   │   │   │   ├── seo/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── seo.builder.js
│   │   │   │   │   │   │   └── seo.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── seo.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── createSeo.schema.js
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── seo.request.schema.js
│   │   │   │   │   │   │   ├── seo.schema.js
│   │   │   │   │   │   │   ├── seo.utils.js
│   │   │   │   │   │   │   └── updateSeo.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── seo.component.js
│   │   │   │   │   ├── shared/
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   └── params.schema.js
│   │   │   │   │   │   ├── ensureExists.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── tags/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── tags.builder.js
│   │   │   │   │   │   │   └── tags.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── tags.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── setTagsRequest.schema.js
│   │   │   │   │   │   │   ├── tags.normalizer.js
│   │   │   │   │   │   │   └── tags.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── tags.component.js
│   │   │   │   │   ├── variants/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── variants.builder.js
│   │   │   │   │   │   │   └── variants.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── variants.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringVariant.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── variants.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── variants.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── variants.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── variants.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── variants.normalizer.js
│   │   │   │   │   │   │   └── variants.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── variants.component.js
│   │   │   │   │   ├── component.contract.js
│   │   │   │   │   ├── component.pipeline.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offeringStatus.constants.js
│   │   │   │   │   └── offeringVisibility.constants.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.controller.js
│   │   │   │   ├── errors/
│   │   │   │   │   └── index.js
│   │   │   │   ├── lifecycles/
│   │   │   │   │   ├── shared/
│   │   │   │   │   │   └── offering.lifecycle.js
│   │   │   │   │   ├── booking.lifecycle.js
│   │   │   │   │   ├── course.lifecycle.js
│   │   │   │   │   ├── digitalDownload.lifecycle.js
│   │   │   │   │   ├── event.lifecycle.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── lifecycle.factory.js
│   │   │   │   │   ├── membership.lifecycle.js
│   │   │   │   │   ├── package.lifecycle.js
│   │   │   │   │   ├── product.lifecycle.js
│   │   │   │   │   ├── rental.lifecycle.js
│   │   │   │   │   ├── service.lifecycle.js
│   │   │   │   │   └── subscription.lifecycle.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.model.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.presenter.js
│   │   │   │   ├── projections/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── noop.projection.js
│   │   │   │   │   └── projection.contract.js
│   │   │   │   ├── registries/
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── businessParamsSchema.js
│   │   │   │   │   ├── createOfferingSchema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── listOfferingsQuerySchema.js
│   │   │   │   │   ├── offeringParamsSchema.js
│   │   │   │   │   └── updateOfferingSchema.js
│   │   │   │   └── index.js
│   │   │   ├── platform/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── businessType.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── businessType.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── platform.routes.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── scripts/
│   │   │   ├── seed-permissions.js
│   │   │   └── seed-roles.js
│   │   └── shared/
│   │       ├── constants/
│   │       │   ├── auditActions.js
│   │       │   ├── auditEntityTypes.js
│   │       │   ├── categoryStatus.js
│   │       │   ├── cookies.js
│   │       │   ├── httpStatus.js
│   │       │   ├── index.js
│   │       │   ├── inventoryStatus.js
│   │       │   ├── offeringVariantStatus.js
│   │       │   ├── permissions.js
│   │       │   ├── pricing.js
│   │       │   ├── productImage.js
│   │       │   ├── ProductStatus.js
│   │       │   └── stockMovement.js
│   │       ├── database/
│   │       │   ├── index.js
│   │       │   ├── populates.js
│   │       │   └── transaction.js
│   │       ├── errors/
│   │       │   ├── AppError.js
│   │       │   ├── ErrorCodes.js
│   │       │   ├── errorHandler.js
│   │       │   ├── index.js
│   │       │   ├── notFound.js
│   │       │   └── uploadErrorHandler.js
│   │       ├── events/
│   │       ├── http/
│   │       │   ├── index.js
│   │       │   └── requestMetadata.js
│   │       ├── middleware/
│   │       │   └── upload.js
│   │       ├── platform/
│   │       │   ├── businessTypes/
│   │       │   │   ├── businessType.constants.js
│   │       │   │   ├── businessType.registry.js
│   │       │   │   └── index.js
│   │       │   ├── capabilities/
│   │       │   │   ├── capability.constants.js
│   │       │   │   ├── capability.registry.js
│   │       │   │   ├── capabilityCategory.constants.js
│   │       │   │   └── index.js
│   │       │   ├── domains/
│   │       │   │   └── domain.constants.js
│   │       │   ├── modules/
│   │       │   │   ├── index.js
│   │       │   │   ├── module.constants.js
│   │       │   │   └── module.registry.js
│   │       │   ├── offeringComponents/
│   │       │   │   ├── index.js
│   │       │   │   ├── offeringComponent.constants.js
│   │       │   │   ├── offeringComponent.registry.js
│   │       │   │   ├── offeringComponent.utils.js
│   │       │   │   └── offeringComponentCategory.constants.js
│   │       │   ├── offerings/
│   │       │   │   ├── index.js
│   │       │   │   ├── offering.constants.js
│   │       │   │   ├── offering.registry.js
│   │       │   │   └── offeringCategory.constants.js
│   │       │   ├── registry/
│   │       │   │   ├── index.js
│   │       │   │   ├── registry.bootstrap.js
│   │       │   │   ├── registry.js
│   │       │   │   ├── registry.utils.js
│   │       │   │   └── registry.validator.js
│   │       │   └── index.js
│   │       ├── services/
│   │       │   └── imageStorage/
│   │       │       ├── providers/
│   │       │       │   └── cloudinary.provider.js
│   │       │       └── imageStorage.service.js
│   │       ├── types/
│   │       ├── utils/
│   │       │   ├── apiResponse.js
│   │       │   ├── asyncHandler.js
│   │       │   ├── index.js
│   │       │   ├── presenter.js
│   │       │   └── slugify.js
│   │       ├── validation/
│   │       │   ├── common/
│   │       │   │   ├── boolean.schema.js
│   │       │   │   ├── email.schema.js
│   │       │   │   ├── objectId.schema.js
│   │       │   │   ├── password.schema.js
│   │       │   │   └── phone.schema.js
│   │       │   ├── index.js
│   │       │   ├── schemas.js
│   │       │   └── validateRequest.js
│   │       └── index.js
│   ├── .env.development
│   ├── .env.example
│   ├── .env.production
│   ├── .gitignore
│   └── package.json
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```
