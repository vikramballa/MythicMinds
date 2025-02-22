import { pipeline } from '@xenova/transformers';

class StoryGenerationPipeline {
  static task = 'text-generation';
  static model = 'yash0027/llama-3-8b-Instruct-bnb-4bit-story-generator-yashwanth'; 
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

export const generateStory = async (prompt) => {
  try {
    const generator = await StoryGenerationPipeline.getInstance();
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `${prompt} Please generate a complete story with a clear beginning, middle, and end, and include a moral at the end.` }
    ];

    const text = generator.tokenizer.apply_chat_template(messages, {
      tokenize: false,
      add_generation_prompt: true,
    });

    const output = await generator(text, {
      max_new_tokens: 500, 
      do_sample: true, 
      temperature: 0.8, 
      top_p: 0.95, 
      return_full_text: false,
    });

    return { story: output[0].generated_text };
  } catch (error) {
    return { error: 'An error occurred while generating the story' };
  }
};
// import { pipeline } from '@xenova/transformers';

// class StoryGenerationPipeline {
//   static task = 'text-generation';
//   static model = 'Xenova/llama2.c-stories15M'; // Updated model for story generation
//   static instance = null;

//   // Initialize the model pipeline as a singleton
//   static async getInstance(progress_callback = null) {
//     if (this.instance === null) {
//       this.instance = await pipeline(this.task, this.model, { progress_callback });
//     }
//     return this.instance;
//   }
// }

// export const generateStory = async (prompt) => {
//   try {
//     const generator = await StoryGenerationPipeline.getInstance();
    
//     const output = await generator(prompt, {
//       max_new_tokens: 500, // Allows a longer response
//       do_sample: true,
//       temperature: 0.8,
//       top_p: 0.95,
//       return_full_text: false,
//     });

//     return { story: output[0].generated_text };
//   } catch (error) {
//     console.error("Error generating story:", error);
//     return { error: 'An error occurred while generating the story' };
//   }
// };
