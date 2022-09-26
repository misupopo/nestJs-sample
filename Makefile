# キューはあらかじめ http://localhost:15672 の GUI から作成しておくこと
queueName = "test-send-queue"

# メッセージキューが届くまで待ち受ける
receive:
	curl -X GET http://localhost:3000/rabbitmq/receive/wait \
		-d queue_name=$(queueName)

# キューに対してメッセージを送信
send:
	curl -X GET http://localhost:3000/rabbitmq/send \
		-d queue_name=$(queueName) \
		-d message="{'test': 'test'}"
