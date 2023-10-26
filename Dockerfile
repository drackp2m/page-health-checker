FROM ghcr.io/puppeteer/puppeteer:latest AS base

# RUN apk add --no-cache build-base python3

WORKDIR /usr/src/app

ARG USER_GID
ARG USER_UID

# RUN addgroup -S pptruser && adduser -S -g pptruser -G pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /usr/src/app

USER root

RUN if [ -n "$USER_GID" ] && [ "$USER_GID" != "1000" ]; then \
			sed -i "s/pptruser:x:1000:1000:/pptruser:x:1000:$USER_GID:/" /etc/passwd; \
		fi && \
		if [ -n "$USER_UID" ] && [ "$USER_UID" != "1000" ]; then \
			sed -i "s/pptruser:x:1000:/pptruser:x:$USER_UID:/" /etc/passwd; \
		fi

RUN chown -R pptruser:pptruser /usr/src/app \
			&& chown -R pptruser:pptruser /home/pptruser

# RUN apk update && apk add --no-cache --virtual \
# 		build-deps \
# 		udev \
# 		ttf-opensans \
# 		chromium \
# 		ca-certificates



FROM base AS deps

USER pptruser

COPY package.json package.lock* .

RUN npm install --silent --frozen-lockfile



FROM deps AS dev-attached

USER root

# RUN apk add --no-cache sudo git openssh-client gnupg \
# 			vim zsh zsh-vcs alpine-zsh-config ˆ[]

RUN apt update && apt install -y sudo zsh

# RUN addgroup pptruser root \
# 			&& echo "%root ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers

USER pptruser

RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k \
		&& echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc

RUN git config --global --add safe.directory /usr/src/app

RUN mkdir /home/pptruser/.gnupg \
			&& chmod 700 /home/pptruser/.gnupg

RUN mkdir -p ~/.local/share/zsh/plugins \
			&& ln -s /usr/share/zsh/plugins/powerlevel10k ~/.local/share/zsh/plugins/

CMD npm start
