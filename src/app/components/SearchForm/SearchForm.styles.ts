import styled from "styled-components";
import {Container, Form, FormControl, Row, Button} from "react-bootstrap";

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const StyledButton = styled(Button)`
  padding: 1rem;
`;

export const StyledContainer = styled(Container)`
  padding: 1rem;
`;

export const StyledFormControl = styled(FormControl)`
  width: 60%;
  margin-right: 1rem;
`;

export const StyledListGroup = styled(Container)`
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
  overflow-y: scroll;
  height: calc(100vh - 100px);
`;

export const StyledListGroupItem = styled(Row)`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;
