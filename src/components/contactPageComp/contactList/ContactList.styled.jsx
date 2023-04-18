import styled from 'styled-components';

const List = styled.ul`
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-bottom: 0px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;
export { List, ListItem };
