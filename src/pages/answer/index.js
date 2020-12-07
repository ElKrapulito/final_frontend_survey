import React, { useEffect, useState } from "react";
import requestHandler from "../../shared/requestHandler";
import { EDIT, GET } from "../../shared/methods";
import { Button, Col, Row, Table } from "react-bootstrap";
import { answerUrl, surveyUrl, userAnswerUrl } from "../../shared/urls";
import { useHistory } from "react-router-dom";

export default () => {
  const [answers, setAnswers] = useState([]);
    let mainHandler = requestHandler();
    let history = useHistory();

    const fetchSurveys = async () => {
        let res = await mainHandler(EDIT, userAnswerUrl, null, sessionStorage.getItem('user_id'));
        setAnswers(res.data.answers);
    } 

    useEffect(() => {
      fetchSurveys();
    }, []);

  return (
    <Row className="justify-content-md-center mt-3">
      <Col xs lg="7">
        <Table striped bordered variant="secondary">
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th colSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.id}>
                <td>{answer.id}</td>
                <td>{answer.survey.title}</td>
                <td>
                  {/* <Button
                    className="mr-2"
                    onClick={() => {
                      history.push(`answer/${answer.survey.id}`);
                    }}
                  >
                    Ver
                  </Button> */}
                  <Button
                    className="mr-2"
                    onClick={() => {
                      history.push(`answer/${answer.id}/edit`);
                    }}
                    variant="info"
                  >
                    Editar
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
