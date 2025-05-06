CREATE OR REPLACE FUNCTION process_payment(
    userid VARCHAR(255),
    serviceid VARCHAR(255),
    amount NUMERIC,
    paymentmethod VARCHAR(255)
)
RETURNS TABLE (
    transactionid uuid,
    status VARCHAR(255),
    paymentdate timestamp with time zone
)
LANGUAGE plpgsql
AS $$
BEGIN
    transactionid := gen_random_uuid();

    status := 'PENDING';

    paymentdate := NOW();

    INSERT INTO payment (transactionid, userid, serviceid, amount, paymentmethod, status, paymentdate)
    VALUES (transactionid, userid, serviceid, amount, paymentmethod, status, paymentdate);

    status := 'SUCCESS';

    RETURN QUERY SELECT transactionid, status, paymentdate;
END;
$$;

CREATE OR REPLACE FUNCTION get_payment_history (
    user_id IN VARCHAR(255) 
)
RETURNS TABLE (
    transactionid UUID,
    userid VARCHAR(255),
    serviceid VARCHAR(255),
    amount DECIMAL(10, 2),
    paymentmethod VARCHAR(255),
    status VARCHAR(255),
    paymentdate TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT p.transactionid, p.userid, p.serviceid, p.amount, p.paymentmethod, p.status, p.paymentdate
	FROM payment p
	WHERE p.userid = user_id;
END;
$$;

-- Función para obtener la lista de servicios
CREATE OR REPLACE FUNCTION get_services ()
RETURNS TABLE (
    serviceid VARCHAR(255),
    name VARCHAR(255),
    provider VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT s.serviceid, s.name, s.provider
                 FROM Service s;
END;
$$;

CREATE OR REPLACE PROCEDURE create_service (
    serviceid IN VARCHAR(255),
    name IN VARCHAR(255),
    provider IN VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insertar el servicio en la tabla Service
    INSERT INTO Service (serviceid, name, provider)
    VALUES (serviceid, name, provider);
END;
$$;