FROM arpanpal010/alpine-node:x86_64
RUN cd /
RUN mkdir project
COPY . /project
RUN cd project
RUN npm install  
RUN npm install bibtex
RUN npm install axios
RUN npm install http-proxy-middleware
EXPOSE 3000
ENTRYPOINT npm start