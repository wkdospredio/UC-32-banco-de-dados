CREATE TABLE `CLIENTE` (
  `id_cliente` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100),
  `telefone` varchar(20)
);

CREATE TABLE `PRODUTO` (
  `id_produto` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int NOT NULL
);

CREATE TABLE `PEDIDO` (
  `id_pedido` int PRIMARY KEY AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `data_pedido` date NOT NULL,
  `status` varchar(30)
);

CREATE TABLE `ITEM_PEDIDO` (
  `id_item` int PRIMARY KEY AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL
);

ALTER TABLE `PEDIDO` ADD FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTE` (`id_cliente`);

ALTER TABLE `ITEM_PEDIDO` ADD FOREIGN KEY (`id_pedido`) REFERENCES `PEDIDO` (`id_pedido`);

ALTER TABLE `ITEM_PEDIDO` ADD FOREIGN KEY (`id_produto`) REFERENCES `PRODUTO` (`id_produto`);
