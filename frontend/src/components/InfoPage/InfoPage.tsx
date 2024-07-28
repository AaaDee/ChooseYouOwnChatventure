import React from 'react';
import { StyledInfoPage, StyledWrapper, TextParagraph } from './style';
import { CloseButtonSection } from './CloseButtonSection';

export function InfoPage() {
  return (
    <StyledWrapper>
      <StyledInfoPage>
        <CloseButtonSection />
        <h1>Info</h1>
        <TextParagraph>{infoText1}</TextParagraph>
        <h1>Credits</h1>
        <TextParagraph>
          {credits1}
          <a href="https://www.linkedin.com/in/aarne-rissanen/">
            Aarne Rissanen
          </a>
          {credits2}
          <a href="https://www.youtube.com/@randommynd">Random Mind</a>
        </TextParagraph>
        <h2>Acknowledgements</h2>
        <TextParagraph>{credits3}</TextParagraph>
      </StyledInfoPage>
    </StyledWrapper>
  );
}

const infoText1 = `In Choose Your Own Chatventure, you get a chance to embark on a fabulous adventure in the realms of mystery. The adventures are created and illustrated using AI-wizardry, so every adventure you embark on will be unique.

After logging in, start your journey and choose your path in the adventure from the options given to you. The adventure is endless, and it will continue as long as you wish to continue it.`;

const credits1 = `Game idea and development: `;

const credits2 = `

Writing and illustrations: OpenAI

Music: The Bard's Tale (CC0) by `;

const credits3 = `Beta testing and feedback: Pauline, Antti, Olavi, Wille`;
