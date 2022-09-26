# キューはあらかじめ http://localhost:15672 の GUI から作成しておくこと
#destinationQueueName = "test-send-queue"
#targetQueueName = "target-send-queue"

# メッセージキューが届くまで待ち受ける
# sequenceId の 10 がきたら終了（10 以外であれば待つ）
# make receive waitQueueName=test-send-queue sequenceId=10
receive:
	curl -X GET http://localhost:3000/rabbitmq/receive/wait \
		-d wait_queue_name=$(waitQueueName) \
		-d sequence_id="$(sequenceId)"

# キューに対してメッセージを送信
# make send destinationQueueName=test-send-queue sequenceId=10
send:
	curl -X GET http://localhost:3000/rabbitmq/send \
		-d destination_queue_name=$(destinationQueueName) \
		-d message='{"sequenceId": "$(sequenceId)"}'
