# tos_filter
A subpart of the project is named OPENAI Terms of Service analyzer. 

-word filter program that turns a terms of service and minimizes it. Removing all the "common" legal sentences and essentially giving us rest of the "suspicious" sentences to look at. 

-extract the most broad statements, exp, if a company mentions they have rights to collect and share personal information without defining limitations, this will be flagged and looked at.
-Thinking about another way to takle the broad statement issue.

-Things this will look at are Data collection, third-party sharing, waiver of class action rights, liability, forced account deletion and more. 

-Note to self: Improve the extracting service for better tos.txt

Technologies.
-NLP the "Naive Bayes classifier" 
