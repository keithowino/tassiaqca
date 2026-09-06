The following is the universally shared container element, update it so that it will be able to adopt to any viewport accordingly(make it responsive).

```jsx
`~C:\software_develpment\1_projects\tassiaqca\client\src\shared\ui\Container\Container.jsx`;

export default function Container({ children, className = "" }) {
	return (
		<div className={`container mx-auto max-w-4xl px-4 ${className}`}>
			{children}
		</div>
	);
}
```
