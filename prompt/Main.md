# TassiaQCA Folder Structure

Generated on: 2026-08-16

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
│   │       │   ├── permissions.js
│   │       │   ├── pricing.js
│   │       │   ├── productImage.js
│   │       │   ├── ProductStatus.js
│   │       │   ├── productVariantStatus.js
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
│   │       │   └── registry/
│   │       │       ├── index.js
│   │       │       ├── registry.bootstrap.js
│   │       │       ├── registry.js
│   │       │       ├── registry.utils.js
│   │       │       └── registry.validator.js
│   │       ├── services/
│   │       │   └── imageStorage/
│   │       │       ├── providers/
│   │       │       │   └── cloudinary.provider.js
│   │       │       └── imageStorage.service.js
│   │       ├── types/
│   │       ├── utils/
│   │       │   ├── apiResponse.js
│   │       │   ├── asyncHandler.js
│   │       │   ├── presenter.js
│   │       │   └── slugify.js
│   │       └── validation/
│   │           ├── common/
│   │           │   ├── boolean.schema.js
│   │           │   ├── email.schema.js
│   │           │   ├── objectId.schema.js
│   │           │   ├── password.schema.js
│   │           │   └── phone.schema.js
│   │           ├── index.js
│   │           ├── schemas.js
│   │           └── validateRequest.js
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

Before we proceed to creating the remaining offering components i would like for us to update the projects README.md file. It follows the previous state of the project way back before we even begun constructing it's business domain. update it so that it may fit our current vision, expectations and or ambitions. modify where needed and return the updated version

Here it is:

````md
# TassiaQCA

![TassiaQCA Banner](./client/public/banner.jfif)

## Overview

TassiaQCA is a community-centric e-commerce and business discovery platform built specifically for the Tassia Complex in Embakasi, Nairobi. As local entrepreneurship continues to grow, many small businesses still struggle with digital visibility while residents often miss nearby products and services.

TassiaQCA bridges this gap by creating a centralized local marketplace where businesses can showcase their offerings and community members can discover, shop, and engage with nearby vendors—all in one place.

### The Problem

Small businesses struggle with online visibility, while residents waste time searching for trusted local services and products.

### The Solution

A digital community marketplace where local businesses can list products and services, and residents can discover, order, review, and connect with nearby merchants.

**Live Demo:** https://tassiaqca.vercel.app/

---

## Key Features

### Customer Features

- **Discover Local Businesses** — Browse businesses by category or search by name/service
- **Shopping Cart with Persistence** — Cart items saved locally across sessions
- **Order Tracking** — Track orders from pending to completion with real-time status updates
- **Community Board** — Share announcements, deals, and interact with neighbors
- **Business Reviews & Ratings** — Rate and review experiences with star ratings
- **Favorites System** — Save businesses for quick access
- **Delivery & Pickup Options** — Flexible fulfillment choices with delivery fee calculation
- **Responsive Design** — Seamless experience across mobile, tablet, and desktop

### Business Owner Features

- **Comprehensive Business Dashboard** — Manage your storefront in one place
- **Product & Service Management** — Add, edit, and remove listings with stock tracking
- **Order Management System** — Process and manage customer orders with status updates
- **Performance Analytics** — Monitor views, ratings, and business activity
- **Business Submission Workflow** — Submit listings for admin approval
- **Delivery Configuration** — Set delivery fees and minimum order requirements
- **Business Hours Management** — Configure operating hours and days

### Admin Features

- **Business Approval System** — Review, approve, or reject business listings
- **Content Moderation** — Manage reviews, community posts, and user content
- **User Management** — View and manage user accounts and roles
- **Platform Analytics** — Monitor ecosystem growth and activity metrics
- **Category Management** — Create and manage business categories

---

## Technology Stack

| Category            | Technology                           |
| :------------------ | :----------------------------------- |
| Frontend            | React 19 + Vite                      |
| Styling             | Tailwind CSS                         |
| Routing             | React Router DOM v7                  |
| State Management    | React Context API                    |
| HTTP Client         | Axios                                |
| Icons               | Lucide React                         |
| Backend             | Node.js + Express                    |
| Database            | MongoDB + Mongoose ODM               |
| Authentication      | JWT (JSON Web Tokens)                |
| Password Encryption | bcryptjs                             |
| Payment Integration | Daraja API (M-Pesa) - Planned        |
| Maps Integration    | Leaflet + React-Leaflet - Planned    |
| Build Tool          | Vite                                 |
| Hosting             | Render (Backend) + Vercel (Frontend) |

---

## Architecture

### Frontend Structure

```bash

client/
├── src/
│ ├── components/
│ │ ├── business/ # Business cards, filters, categories
│ │ ├── common/ # Loading spinners, star ratings, metadata
│ │ ├── layout/ # Header, footer, bottom navigation
│ │ └── orders/ # Cart drawer, checkout flow
│ ├── lib/
│ │ ├── api.js # Centralized API service layer
│ │ ├── context/ # Auth, Cart, Data contexts
│ │ └── MetadataInsert.jsx
│ ├── pages/ # All route pages
│ └── App.jsx # Main application with routing

```

### Backend Structure

```bash

server/
├── src/
│ ├── controllers/ # Business logic for each entity
│ ├── models/ # MongoDB schemas (User, Business, Product, etc.)
│ ├── routes/ # API route definitions
│ ├── middleware/ # Auth, validation, error handling
│ └── server.js # Express application entry point

```

---

### API Endpoints

---

| Method | Endpoint                   | Description              | Access         |
| :----- | :------------------------- | :----------------------- | :------------- |
| POST   | /api/auth/register         | User registration        | Public         |
| POST   | /api/auth/login            | User login               | Public         |
| POST   | /api/auth/google           | Google OAuth login       | Public         |
| GET    | /api/auth/me               | Get current user profile | Authenticated  |
| GET    | /api/businesses            | Get all businesses       | Public         |
| GET    | /api/businesses/my         | Get user's businesses    | Business Owner |
| POST   | /api/businesses            | Create new business      | Business Owner |
| PUT    | /api/businesses/:id        | Update business          | Owner/Admin    |
| GET    | /api/products/business/:id | Get products by business | Public         |
| POST   | /api/orders                | Create new order         | Customer       |
| GET    | /api/orders/my             | Get user's orders        | Customer       |
| PATCH  | /api/orders/:id/status     | Update order status      | Business Owner |
| POST   | /api/reviews               | Create business review   | Customer       |
| GET    | /api/community/posts       | Get community posts      | Public         |
| POST   | /api/community/posts       | Create community post    | Authenticated  |

---

## Feature Access Matrix

| Feature                    | Customer | Business Owner | Admin |
| :------------------------- | :------: | :------------: | :---: |
| Browse businesses          |    ✓     |       ✓        |   ✓   |
| Place orders               |    ✓     |       ✓        |   ✓   |
| Write reviews              |    ✓     |       ✓        |   ✓   |
| Community interactions     |    ✓     |       ✓        |   ✓   |
| Save favorites             |    ✓     |       ✓        |   ✓   |
| Manage business listing    |    —     |       ✓        |   ✓   |
| Manage business orders     |    —     |       ✓        |   ✓   |
| Add/Edit products/services |    —     |       ✓        |   ✓   |
| View business analytics    |    —     |       ✓        |   ✓   |
| Configure delivery options |    —     |       ✓        |   ✓   |
| Approve businesses         |    —     |       —        |   ✓   |
| Moderate content           |    —     |       —        |   ✓   |
| Manage categories          |    —     |       —        |   ✓   |
| View platform analytics    |    —     |       —        |   ✓   |

---

## Project Structure

```bash
tassiaqca/
├── client/                    # React frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Contexts, API, utilities
│   │   └── pages/            # Route pages
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── server/                    # Node.js backend application
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   └── middleware/       # Auth, validation
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Prerequisites

Before running the project locally, ensure you have:

- Node.js (v18+ recommended)
- npm or yarn
- Git
- Modern browser
- MongoDB Atlas account (or local MongoDB instance)

---

## Installation & Setup

### Clone the repository:

```bash
git clone https://github.com/keithowino/tassiaqca.git
cd tassiaqca
```

### Backend Setup:

```bash
cd server
npm install
cp .env.example .env.development
# Edit .env.development with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup:

```bash
cd client
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

### Environment Variables

**Backend (.env.development):**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

**Frontend (.env.development):**

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Open `http://localhost:3000` to view the application.

---

## Deployment

### Backend Deployment (Render)

```bash
# Connect your GitHub repository to Render
# Set environment variables in Render dashboard
# Deploy automatically on push
```

### Frontend Deployment (Vercel)

```bash
npm run build
# Connect your GitHub repository to Vercel
# Set VITE_API_URL to your deployed backend URL
# Deploy
```

---

## Current Status ✅

- ✅ Complete MongoDB migration from Firebase
- ✅ JWT authentication system
- ✅ Business registration and management
- ✅ Product/service CRUD operations
- ✅ Shopping cart with localStorage persistence
- ✅ Order processing system
- ✅ Review and rating system
- ✅ Community board with post types
- ✅ Favorites system
- ✅ Admin moderation panel
- ✅ Responsive mobile-first design
- ✅ CORS and environment configuration
- ✅ Error handling and validation

---

## Planned Enhancements

### Phase 1: Payment & Financial Systems

- **M-Pesa Integration (Daraja API)** — Direct mobile payments
- **Multiple Payment Methods** — Card payments, bank transfers
- **Digital Receipts** — Email/SMS order confirmations
- **Wallet System** — In-app wallet for faster checkout
- **Business Payouts** — Automated settlement to business owners
- **Transaction History** — Detailed financial records for users

### Phase 2: Maps & Location Services

- **Interactive Store Locator** — Leaflet.js integration
- **Real-time Delivery Tracking** — GPS-based order tracking
- **Geofencing** — Automatic store discovery based on location
- **Distance-based Delivery Fees** — Dynamic pricing based on distance
- **Store Directions** — Navigation assistance for pickup
- **Service Area Management** — Businesses define delivery zones

### Phase 3: Communication & Engagement

- **Push Notifications** — Order updates, promotions, reminders
- **In-app Messaging** — Direct chat between customers and businesses
- **Live Order Updates** — Real-time WebSocket notifications
- **Email Marketing Integration** — Newsletter and campaign management
- **SMS Alerts** — Critical order notifications via text
- **Community Events Calendar** — Local event management

### Phase 4: AI & Personalization

- **AI-Powered Recommendations** — Personalized product suggestions
- **Smart Search** — Semantic search with natural language processing
- **Predictive Inventory** — Stock prediction for businesses
- **Customer Segmentation** — Targeted marketing campaigns
- **Review Sentiment Analysis** — Automated review insights
- **Chatbot Support** — AI-powered customer service assistant

### Phase 5: Business Intelligence

- **Advanced Analytics Dashboard** — Sales trends, customer behavior
- **Export Reports** — CSV/PDF exports for business owners
- **Competitor Analysis** — Benchmarking against similar businesses
- **Customer Lifetime Value** — Retention and loyalty metrics
- **Peak Hour Analysis** — Optimal operating hours recommendations
- **Inventory Alerts** — Low stock notifications

### Phase 6: Social & Gamification

- **Loyalty Programs** — Points system for repeat customers
- **Referral System** — Earn rewards for inviting friends
- **Badges & Achievements** — Gamified user engagement
- **Social Media Integration** — Share products to Facebook, Twitter
- **Flash Sales** — Time-limited discounts and promotions
- **Group Buying** — Collective purchasing power discounts

### Phase 7: Multi-tenant & Scalability

- **Multi-language Support** — English + Swahili + other local languages
- **Multi-currency Support** — Handle different currencies
- **Progressive Web App (PWA)** — Offline access and installable app
- **Mobile Native Apps** — React Native for iOS and Android
- **White-label Solution** — Customizable for other communities
- **API Rate Limiting** — Scalable request handling

### Phase 8: Advanced Features

- **Voice Search** — Hands-free business discovery
- **Image Recognition** — Search products by photo
- **Augmented Reality** — Virtual product preview
- **Blockchain Receipts** — Immutable transaction records
- **Subscription Models** — Premium features for businesses
- **Affiliate Marketing** — Earn commissions on referrals

---

## Development Roadmap

| Quarter | Focus Area              | Key Deliverables                        |
| :------ | :---------------------- | :-------------------------------------- |
| Q1 2026 | Core Platform Stability | Complete MongoDB migration, bug fixes   |
| Q2 2026 | Payment Integration     | M-Pesa, digital receipts, wallet system |
| Q3 2026 | Maps & Location         | Store locator, delivery tracking        |
| Q4 2026 | AI Features             | Recommendations, smart search, chatbot  |
| Q1 2027 | Mobile Apps             | React Native iOS/Android applications   |
| Q2 2027 | Scale & Expand          | White-label solution, multi-language    |

---

## Known Issues & Troubleshooting

### CORS Errors

Ensure your backend `CLIENT_URL` environment variable matches your frontend URL exactly (no trailing slash).

### MongoDB Connection Issues

- Verify IP whitelist in MongoDB Atlas
- Check connection string credentials
- Ensure network allows outbound connections

### JWT Authentication

- Tokens expire after 7 days (configurable)
- Clear localStorage on logout
- Tokens are automatically refreshed on protected routes

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Update documentation for new features
- Test thoroughly before submitting PR

---

## License

This project is proprietary and confidential.

See the [LICENSE](./LICENSE) file for additional details.

All rights reserved.

---

## Acknowledgments

- **DeepSeek** — Primary AI assistant for development guidance
- **Bolt.new** — Accelerated initial prototyping
- **MongoDB Atlas** — Scalable database infrastructure
- **Render & Vercel** — Reliable hosting platforms
- **Local business owners** — Valuable feedback and testing
- **Community members** — Continuous support and engagement
- **Open Source Community** — Amazing tools and libraries

---

## Contact

**Keith Owino**

- Email: designsolutions1629@gmail.com
- GitHub: [@keithowino](https://github.com/keithowino)
- Portfolio: [Pickaxe & Shovel](https://pickaxe-and-shovel.vercel.app)
- Twitter: [@keithowino](https://twitter.com/keithowino)

**Project Links:**

- Repository: https://github.com/keithowino/tassiaqca
- Live Demo: https://tassiaqca.vercel.app/
- API Endpoint: https://tassiaqca.onrender.com

---

## Support the Project

If you find this project valuable, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs via Issues
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with your network

For business inquiries or partnerships, please reach out via email.

---

## Version History

| Version | Date       | Changes                                           |
| :------ | :--------- | :------------------------------------------------ |
| 1.0.0   | 2024-12-01 | Initial Firebase launch                           |
| 2.0.0   | 2026-01-15 | Complete MongoDB migration                        |
| 2.1.0   | 2026-03-01 | Cart system, order management                     |
| 2.2.0   | 2026-05-01 | Community board, reviews, favorites               |
| 2.3.0   | 2026-06-01 | Admin panel, analytics, performance optimizations |

---

**Built with ❤️ for the Tassia Community**

_Empowering local businesses, connecting neighbors, building community._
````
