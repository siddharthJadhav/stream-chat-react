import React from 'react';

import PropTypes from 'prop-types';

/**
 * AttachmentActions - The actions you can take on an attachment
 *
 * @example ../../docs/AttachmentActions.md
 * @type {React.FC<import('type').AttachmentActionsProps>}
 */
const AttachmentActions = ({ actionHandler, actions, id, text }) => (
  <div className='str-chat__message-attachment-actions'>
    <div className='str-chat__message-attachment-actions-form'>
      <span key={0}>{text}</span>
      {actions.map((action) => (
        <button
          className={`str-chat__message-attachment-actions-button str-chat__message-attachment-actions-button--${action.style}`}
          data-testid={`${action.name}`}
          data-value={action.value}
          key={`${id}-${action.value}`}
          onClick={(e) => actionHandler(action.name, action.value, e)}
        >
          {action.text}
        </button>
      ))}
    </div>
  </div>
);

AttachmentActions.propTypes = {
  /**
   *
   * @param name {string} Name of action
   * @param value {string} Value of action
   * @param event Dom event that triggered this handler
   */
  actionHandler: PropTypes.func.isRequired,
  /** A list of actions */
  actions: PropTypes.array.isRequired,
  /** Unique id for action button key. Key is generated by concatenating this id with action value - {`${id}-${action.value}`} */
  id: PropTypes.string.isRequired,
  /** The text for the form input */
  text: PropTypes.string,
};

export default React.memo(AttachmentActions);
