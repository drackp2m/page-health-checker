FROM node:20-alpine AS base

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache --virtual \
		build-base python3 chromium udev ttf-opensans ca-certificates

RUN addgroup pptruser \
		&& adduser pptruser -D -G pptruser \
		&& mkdir -p /home/pptruser/Downloads \
		&& chown -R pptruser:pptruser /home/pptruser \
		&& chown -R pptruser:pptruser /usr/src/app

ARG USER_GID
ARG USER_UID

RUN if [ -n "$USER_GID" ] && [ "$USER_GID" != "1000" ]; then \
			sed -i "s/pptruser:x:1000:1000:/pptruser:x:1000:$USER_GID:/" /etc/passwd; \
		fi && \
		if [ -n "$USER_UID" ] && [ "$USER_UID" != "1000" ]; then \
			sed -i "s/pptruser:x:1000:/pptruser:x:$USER_UID:/" /etc/passwd; \
		fi

RUN chown -R pptruser:pptruser /usr/src/app \
			&& chown -R pptruser:pptruser /home/pptruser



FROM base AS deps

USER pptruser

COPY package.json package.lock* .

RUN npm install --silent --frozen-lockfile



FROM deps AS dev-attached

USER root

RUN apk add --no-cache sudo git openssh-client gnupg \
			vim zsh zsh-vcs alpine-zsh-config zsh-theme-powerlevel10k

USER pptruser

RUN git config --global --add safe.directory /usr/src/app

RUN mkdir /home/pptruser/.gnupg \
			&& chmod 700 /home/pptruser/.gnupg

RUN mkdir -p ~/.local/share/zsh/plugins \
			&& ln -s /usr/share/zsh/plugins/powerlevel10k ~/.local/share/zsh/plugins/

CMD npm run dev
