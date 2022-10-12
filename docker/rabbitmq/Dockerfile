FROM rabbitmq:3.6

ENV RABBITMQ_DEFAULT_USER admin
ENV RABBITMQ_DEFAULT_PASS admin

RUN rabbitmq-plugins enable --offline rabbitmq_management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt

COPY rabbitmq-env.conf /etc/rabbitmq/rabbitmq-env.conf
COPY rabbitmq.config /etc/rabbitmq/rabbitmq.config
RUN chown -R rabbitmq:rabbitmq /var/lib/rabbitmq /etc/rabbitmq &&\
	chmod 777 /var/lib/rabbitmq /etc/rabbitmq

# 15672 は GUI
EXPOSE 15672
# 5672 は スプリプトのコネクションポート番号
EXPOSE 5672
# mqtt のポート番号
EXPOSE 1883
