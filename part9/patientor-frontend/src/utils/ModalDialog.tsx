import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { Props } from "../forms/FormField";

export interface ModalProps<TFormValues> extends Props<TFormValues> {
  header: string;
  modalOpen: boolean;
  error?: string;
  onClose: () => void;
}

class ModalDialog<T> extends React.Component<ModalProps<T>> {
  render() {
    return (
      <Modal open={this.props.modalOpen} onClose={this.props.onClose} centered={false} closeIcon>
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>
          {this.props.error && <Segment inverted color="red">{`Error: ${this.props.error}`}</Segment>}
          {this.props.children}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalDialog;