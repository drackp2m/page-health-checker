import { PageContextProvider } from './usePageContext';
import './PageShell.scss';

export { PageShell };

function PageShell({ pageContext, children }) {
	return (
		<PageContextProvider pageContext={pageContext}>
			<Header url={pageContext.urlPathname} />
			<main>{children}</main>
		</PageContextProvider>
	);
}

export function Header({ url }) {
	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>

				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>

				<a href="/500" class={url == '/50x0' && 'active'}>
					500
				</a>
			</nav>
		</header>
	);
}
