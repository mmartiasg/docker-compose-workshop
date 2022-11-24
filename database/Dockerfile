FROM mysql:8.0.31
ENV MYSQL_ROOT_PASSWORD root
COPY ddl_database_schema.sql /docker-entrypoint-initdb.d/ddl_database_schema.sql
