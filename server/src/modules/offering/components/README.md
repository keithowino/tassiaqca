We should first perform a Component Dependency Review. For every component, we should establish:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- What lifecycle hooks does it participate in?
- What happens when it is absent?
- What validation does it perform?
- What invariants must remain true?
- What business concept does it represent?
- What API does it require?
- What permissions are required?
- What audit events are required?
- What registry metadata is required?
- What frontend experience will eventually consume it?
- What should be tested through REST Client?

Only after this analysis should implementation begin.
