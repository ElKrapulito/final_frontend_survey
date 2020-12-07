import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { DELETE, EDIT, GET } from "../../shared/methods";
import requestHandler from "../../shared/requestHandler";
import { surveyUrl, userSurveyrUrl } from "../../shared/urls";

export default () => {
  const [surveys, setSurveys] = useState([]);

  let mainHandler = requestHandler();
  let history = useHistory();

  const fetchSurveys = async () => {
    let res = await mainHandler(EDIT, userSurveyrUrl, null, sessionStorage.getItem('user_id'));
    setSurveys(res.data.surveys);
  };

  const handleDelete = async (id) => {
    let res = await mainHandler(DELETE, surveyUrl, null, id);
    if (res.data.message == "success") {
      await fetchSurveys();
    } else {
      alert("error eliminando encuesta");
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);
  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs lg="7">
        <Link className="btn btn-primary mb-3" to="survey/new">
          Nueva encuesta
        </Link>
        <Table striped bordered variant="secondary">
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th colSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id}>
                <td>{survey.id}</td>
                <td>{survey.title}</td>
                <td>
                  <Button
                    className="mr-2"
                    onClick={() => {
                      history.push(`survey/${survey.id}`);
                    }}
                  >
                    Ver
                  </Button>
                  <Button
                    className="mr-2"
                    onClick={() => {
                      history.push(`survey/${survey.id}/edit`);
                    }}
                    variant="info"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(survey.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
