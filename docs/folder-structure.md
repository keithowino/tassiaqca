# TassiaQCA Folder Structure

Generated on: 2026-09-08

```bash
├── client/
│   ├── public/
│   │   ├── admin.jpeg
│   │   ├── apple-touch-icon.png
│   │   ├── banner.jfif
│   │   ├── BingSiteAuth.xml
│   │   ├── business-profile.jpeg
│   │   ├── cart.png
│   │   ├── community.jpeg
│   │   ├── dashboard.jpeg
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── home.jpeg
│   │   ├── image-generator.png
│   │   ├── mainifest.json
│   │   ├── robots.txt
│   │   ├── screenshot-mobile.jpeg
│   │   ├── site_image.png
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
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
│   │   │   │   │   ├── GatewayFooter.jsx
│   │   │   │   │   ├── GatewayHeader.jsx
│   │   │   │   │   ├── HeroSection.jsx
│   │   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── JourneySection.jsx
│   │   │   │   │   ├── PlatformOverviewSection.jsx
│   │   │   │   │   └── TestimonialsSection.jsx
│   │   │   │   ├── data/
│   │   │   │   │   ├── howItWorks.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── platformOverview.js
│   │   │   │   │   └── testimonials.js
│   │   │   │   ├── layouts/
│   │   │   │   │   ├── GatewayLayout.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AboutPage.jsx
│   │   │   │   │   ├── GatewayPage.jsx
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── PrivacyPage.jsx
│   │   │   │   │   └── TermsPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   ├── gateway.routes.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   └── marketplace/
│   │   │       ├── components/
│   │   │       │   ├── BusinessCard.jsx
│   │   │       │   ├── index.js
│   │   │       │   ├── MarketplaceFooter.jsx
│   │   │       │   ├── MarketplaceHeader.jsx
│   │   │       │   └── OfferingCard.jsx
│   │   │       ├── layouts/
│   │   │       │   ├── index.js
│   │   │       │   └── MarketplaceLayout.jsx
│   │   │       ├── pages/
│   │   │       │   ├── BusinessProfilePage.jsx
│   │   │       │   ├── CategoryPage.jsx
│   │   │       │   ├── index.js
│   │   │       │   ├── MarketplaceHomePage.jsx
│   │   │       │   ├── OfferingProfilePage.jsx
│   │   │       │   └── SearchPage.jsx
│   │   │       ├── routes/
│   │   │       │   ├── index.js
│   │   │       │   └── marketplace.routes.jsx
│   │   │       ├── services/
│   │   │       │   ├── index.js
│   │   │       │   └── marketplace.service.js
│   │   │       ├── index.js
│   │   │       └── README.md
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
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── JourneyLink.jsx
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
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
│   │   │   ├── workspace/
│   │   │   │   ├── api/
│   │   │   │   │   └── workspace.api.js
│   │   │   │   ├── context/
│   │   │   │   │   ├── WorkspaceContext.js
│   │   │   │   │   └── WorkspaceProvider.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useWorkspace.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── bootstrapSession.js
│   │   │   │   │   └── provisioning.service.js
│   │   │   │   ├── types/
│   │   │   │   │   └── workspace.initialState.js
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── shared/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── HeadBack.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── LoadEmptyResponse.jsx
│   │   │   │   ├── LoadError.jsx
│   │   │   │   ├── LoadExperience.jsx
│   │   │   │   ├── LoadingScreen.jsx
│   │   │   │   ├── LoadLogo.jsx
│   │   │   │   ├── SearchEntryPoint.jsx
│   │   │   │   └── SeedHeader.jsx
│   │   │   ├── config/
│   │   │   │   ├── index.js
│   │   │   │   └── platform.config.js
│   │   │   ├── constants/
│   │   │   │   ├── index.js
│   │   │   │   └── journeys.js
│   │   │   ├── hooks/
│   │   │   ├── icons/
│   │   │   │   └── businessTypeIcons.js
│   │   │   ├── layout/
│   │   │   │   ├── AppShell/
│   │   │   │   │   ├── AppShell.jsx
│   │   │   │   │   └── index.js
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
│   │   │   │   ├── SiteFooter/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── SiteFooter.jsx
│   │   │   │   ├── SiteHeader/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── README.md
│   │   │   │   │   └── SiteHeader.jsx
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
│   │   │   ├── utils/
│   │   │   └── index.js
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
│   │   │   │   │   ├── branch.model.js
│   │   │   │   │   ├── branchAssignment.model.js
│   │   │   │   │   ├── business.model.js
│   │   │   │   │   └── index.js
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
│   │   │   │   │   ├── business.repository.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── business.routes.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── branch.service.js
│   │   │   │   │   ├── branchAssignment.service.js
│   │   │   │   │   ├── business.service.js
│   │   │   │   │   ├── businessMember.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── assignBranchMemberRequestSchema.js
│   │   │   │   │   ├── changeMemberRoleRequestSchema.js
│   │   │   │   │   ├── createBranchRequestSchema.js
│   │   │   │   │   ├── createBusinessRequestSchema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── inviteMemberRequestSchema.js
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
│   │   │   │   │   ├── businessConfiguration.repository.js
│   │   │   │   │   └── index.js
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
│   │   │   │   │   ├── index.js
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
│   │   │   │   │   ├── commerce.routes.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── product.routes.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── services/
│   │   │   │   │   ├── category.service.js
│   │   │   │   │   ├── index.js
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
│   │   │   │   │   ├── dashboard.controller.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── dashboard.presenter.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── dashboard.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── dashboard.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── validators/
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
│   │   │   │   │   ├── index.js
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
│   │   │   │   │   ├── businessMember.service.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── loginRequestSchema.js
│   │   │   │   │   ├── logoutRequestSchema.js
│   │   │   │   │   ├── refreshRequestSchema.js
│   │   │   │   │   └── registerRequestSchema.js
│   │   │   │   ├── index.js
│   │   │   │   └── README.md
│   │   │   ├── marketplace/
│   │   │   │   ├── categories/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── category.controller.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── presenters/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── marketplaceCategory.presenter.js
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── category.repository.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   ├── category.routes.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── category.service.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── validators/
│   │   │   │   │   │   ├── categoryQuery.schema.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.controller.js
│   │   │   │   ├── discovery/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── businessDiscovery.controller.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.controller.js
│   │   │   │   │   │   └── trendingOffering.controller.js
│   │   │   │   │   ├── presenters/
│   │   │   │   │   │   ├── businessDiscovery.presenter.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── offeringDiscovery.presenter.js
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── businessDiscovery.repository.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.repository.js
│   │   │   │   │   │   └── trendingOffering.repository.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   ├── discovery.routes.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── businessDiscovery.service.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscovery.service.js
│   │   │   │   │   │   └── trendingOffering.service.js
│   │   │   │   │   ├── validators/
│   │   │   │   │   │   ├── businessDiscoveryQuery.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── offeringDiscoveryQuery.schema.js
│   │   │   │   │   │   └── trendingOfferingsQuery.schema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceOffering.presenter.js
│   │   │   │   ├── profiles/
│   │   │   │   │   ├── businesses/
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── businessProfile.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── businessProfile.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── businessProfile.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── businessProfile.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── businessProfile.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── README.md
│   │   │   │   │   ├── offerings/
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfile.controller.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfile.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfile.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfile.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfile.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringProfileParams.schema.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── profiles.routes.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceOffering.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.routes.js
│   │   │   │   ├── search/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.controller.js
│   │   │   │   │   ├── presenters/
│   │   │   │   │   │   ├── businessSearch.presenter.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOffering.presenter.js
│   │   │   │   │   ├── repositories/
│   │   │   │   │   │   ├── businessSearch.repository.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOffering.repository.js
│   │   │   │   │   ├── routes/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.routes.js
│   │   │   │   │   ├── services/
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── search.service.js
│   │   │   │   │   ├── validators/
│   │   │   │   │   │   ├── businessSearchQuery.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── searchOfferingsQuery.schema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplace.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── marketplaceQuery.schema.js
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
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigation.controller.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigation.presenter.js
│   │   │   │   ├── routes/
│   │   │   │   │   └── navigation.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── navigation.service.js
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
│   │   │   │   │   ├── booking/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── booking.builder.js
│   │   │   │   │   │   │   ├── booking.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── booking.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── booking.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── booking.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── booking.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── booking.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── booking.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── booking.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── booking.component.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── calendar/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── calendar.builder.js
│   │   │   │   │   │   │   ├── calendar.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── calendar.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── calendar.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── calendar.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── calendar.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── calendar.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── calendar.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── calendar.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── calendar.component.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── capacity/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── capacity.builder.js
│   │   │   │   │   │   │   ├── capacity.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── capacity.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── capacity.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── capacity.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── capacity.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── capacity.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── capacity.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── capacity.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── capacity.component.js
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
│   │   │   │   │   │   ├── categories.component.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── download/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── download.builder.js
│   │   │   │   │   │   │   ├── download.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── download.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── download.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── download.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── download.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── download.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── download.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── download.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── download.component.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── README.md
│   │   │   │   │   ├── duration/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── duration.builder.js
│   │   │   │   │   │   │   ├── duration.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── duration.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringDuration.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── duration.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── duration.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── duration.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── duration.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── duration.normalizer.js
│   │   │   │   │   │   │   ├── duration.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── duration.component.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── enrollment/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── enrollment.builder.js
│   │   │   │   │   │   │   ├── enrollment.factory.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── enrollment.controller.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── enrollment.model.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── enrollment.presenter.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── enrollment.repository.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── enrollment.routes.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── enrollment.service.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── enrollment.schema.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── enrollment.component.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── README.md
│   │   │   │   │   ├── instructor/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── instructor.builder.js
│   │   │   │   │   │   │   └── instructor.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── instructor.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── instructor.component.js
│   │   │   │   │   ├── inventory/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── inventory.builder.js
│   │   │   │   │   │   │   └── inventory.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── inventory.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── offeringInventory.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── inventory.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── inventory.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── inventory.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── inventory.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── inventory.normalizer.js
│   │   │   │   │   │   │   └── inventory.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── inventory.component.js
│   │   │   │   │   ├── location/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── location.builder.js
│   │   │   │   │   │   │   └── location.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── location.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── location.component.js
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
│   │   │   │   │   ├── membership/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── membership.builder.js
│   │   │   │   │   │   │   └── membership.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── membership.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── membership.component.js
│   │   │   │   │   │   └── README.md
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
│   │   │   │   │   ├── registration/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── registration.builder.js
│   │   │   │   │   │   │   └── registration.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── registration.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── README.md
│   │   │   │   │   │   └── registration.component.js
│   │   │   │   │   ├── scheduling/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── scheduling.builder.js
│   │   │   │   │   │   │   └── scheduling.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── OfferingScheduling.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── scheduling.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   └── scheduling.component.js
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
│   │   │   │   │   ├── subscription/
│   │   │   │   │   │   ├── builders/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── subscription.builder.js
│   │   │   │   │   │   │   └── subscription.factory.js
│   │   │   │   │   │   ├── controllers/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.controller.js
│   │   │   │   │   │   ├── models/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.model.js
│   │   │   │   │   │   ├── presenters/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.presenter.js
│   │   │   │   │   │   ├── repositories/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.repository.js
│   │   │   │   │   │   ├── routes/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.routes.js
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.service.js
│   │   │   │   │   │   ├── validators/
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   └── subscription.schema.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── README.md
│   │   │   │   │   │   └── subscription.component.js
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
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── README.md
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
│   │       │   ├── offeringCalendarStatus.js
│   │       │   ├── offeringDurationStatus.js
│   │       │   ├── offeringMediaStatus.js
│   │       │   ├── offeringSchedulingStatus.js
│   │       │   ├── offeringSubscriptionStatus.js
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
│   │       │   │   ├── offering.utils.js
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
│   │       │   │   ├── index.js
│   │       │   │   ├── objectId.schema.js
│   │       │   │   ├── params.schema.js
│   │       │   │   ├── password.schema.js
│   │       │   │   └── phone.schema.js
│   │       │   ├── ensureExists.js
│   │       │   ├── index.js
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
