import React from 'react';

import type {
  DefaultAttachmentProps,
  ExtendedAttachment,
  InnerAttachmentUIComponentProps,
} from './Attachment';

export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/ogg',
  'video/webm',
  'video/quicktime',
];

export const isAudioAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'audio';

export const isFileAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'file' ||
  (attachment.mime_type &&
    SUPPORTED_VIDEO_FORMATS.indexOf(attachment.mime_type) === -1 &&
    attachment.type !== 'video');

export const isGalleryAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'gallery';

export const isImageAttachment = (attachment: ExtendedAttachment) =>
  attachment.type === 'image' &&
  !attachment.title_link &&
  !attachment.og_scrape_url;

export const isMediaAttachment = (attachment: ExtendedAttachment) =>
  (attachment.mime_type &&
    SUPPORTED_VIDEO_FORMATS.indexOf(attachment.mime_type) !== -1) ||
  attachment.type === 'video';

export const renderAttachmentWithinContainer: React.FC<
  Partial<DefaultAttachmentProps>
> = (props) => {
  const { attachment, children, componentType } = props;

  const extra =
    componentType === 'card' && !attachment?.image_url && !attachment?.thumb_url
      ? 'no-image'
      : attachment && attachment.actions && attachment.actions.length
      ? 'actions'
      : '';

  return (
    <div
      className={`str-chat__message-attachment str-chat__message-attachment--${componentType} str-chat__message-attachment--${
        attachment?.type || ''
      } str-chat__message-attachment--${componentType}--${extra}`}
      key={`${attachment?.id}-${attachment?.type || 'none'} `}
    >
      {children}
    </div>
  );
};

export const renderAttachmentActions: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { actionHandler, attachment, AttachmentActions } = props;

  if (!AttachmentActions || !attachment.actions || !attachment.actions.length) {
    return null;
  }

  return (
    <AttachmentActions
      {...attachment}
      actionHandler={() => actionHandler}
      actions={attachment.actions || []}
      id={attachment.id || ''}
      key={`key-actions-${attachment.id}`}
      text={attachment.text || ''}
    />
  );
};

export const renderGallery: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Gallery } = props;

  if (!Gallery) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: <Gallery images={attachment.images || []} key='gallery' />,
    componentType: 'gallery',
  });
};

export const renderImage: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Image } = props;

  if (!Image) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment'
          key={`key-image-${attachment.id}`}
        >
          {<Image {...attachment} />}
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'image',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: <Image {...attachment} key={`key-image-${attachment.id}`} />,
    componentType: 'image',
  });
};

export const renderCard: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, Card } = props;

  if (!Card) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment'
          key={`key-image-${attachment.id}`}
        >
          <Card {...attachment} key={`key-card-${attachment.id}`} />
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'card',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: <Card {...attachment} key={`key-card-${attachment.id}`} />,
    componentType: 'card',
  });
};

export const renderFile: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, File } = props;

  if (!File || !attachment.asset_url) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <File attachment={attachment} key={`key-file-${attachment.id}`} />
    ),
    componentType: 'file',
  });
};

export const renderAudio: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment: attachment, Audio } = props;
  if (!Audio) return null;

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <div className='str-chat__attachment' key={`key-video-${attachment.id}`}>
        <Audio og={attachment} />
      </div>
    ),
    componentType: 'audio',
  });
};

export const renderMedia: React.FC<InnerAttachmentUIComponentProps> = (
  props,
) => {
  const { attachment, Media } = props;

  if (!Media) return null;

  if (attachment.actions && attachment.actions.length) {
    return renderAttachmentWithinContainer({
      attachment,
      children: (
        <div
          className='str-chat__attachment str-chat__attachment-media'
          key={`key-video-${attachment.id}`}
        >
          <div className='str-chat__player-wrapper'>
            <Media
              className='react-player'
              controls
              height='100%'
              url={attachment.asset_url}
              width='100%'
            />
          </div>
          {renderAttachmentActions(props)}
        </div>
      ),
      componentType: 'media',
    });
  }

  return renderAttachmentWithinContainer({
    attachment,
    children: (
      <div
        className='str-chat__player-wrapper'
        key={`key-video-${attachment.id}`}
      >
        {' '}
        <Media
          className='react-player'
          controls
          height='100%'
          url={attachment.asset_url}
          width='100%'
        />
      </div>
    ),
    componentType: 'media',
  });
};