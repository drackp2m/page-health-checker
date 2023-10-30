import { PageContextProvider } from './usePageContext';
import './PageShell.scss';

export { PageShell };

function PageShell({ pageContext, children }) {
	return (
		<div id="main-layout" class="flex-col">
			<PageContextProvider pageContext={pageContext}>
				<Header url={pageContext.urlPathname} />
				<main class="content-fixed flex-col py-md">{children}</main>
			</PageContextProvider>
		</div>
	);
}

export function Header({ url }: { url: string }) {
	return (
		<header class="content-fixed flex-col py-md">
			<nav class="flex-row flex-wrap justify-center gap-sm my-md">
				<a
					href="/"
					class={
						'round-sm p-xs px-sm ' + (url == '/' ? 'weight-xxl surface-serene' : 'surface-vivid')
					}
				>
					Home
				</a>

				<a
					href="/404"
					class={
						'round-sm p-xs px-sm ' + (url == '/404' ? 'weight-xxl surface-serene' : 'surface-vivid')
					}
				>
					404
				</a>

				<a
					href="/500"
					class={
						'round-sm p-xs px-sm ' + (url == '/500' ? 'weight-xxl surface-serene' : 'surface-vivid')
					}
				>
					500
				</a>
			</nav>
		</header>
	);
}
