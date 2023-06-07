<?php

namespace App\Services;

use App\Enums\IssueActionTypeEnums;
use App\Exceptions\IssueException;
use App\Models\Book;
use App\Models\User;
use App\Models\Issue;
use Illuminate\Support\Facades\DB;

class IssueService
{
  public function createIssue(User $user, Book $book, array $validated): void
  {
    if($book->stock <= 0) {
      throw new IssueException('Out of stock!');
    }

    if($this->checkBookAlreadyRequested($user, $book)) {
      throw new IssueException('You have already requested the book!');
    }


    DB::transaction(function () use ($user, $book, $validated) {
      $issue = Issue::create([
        'user_id' => $user->id,
        'book_id' => $book->id,
        'expire_date' => $this->calculateExpireDate($validated['month']),
      ]);

      $book->stock -= 1;
      $book->save();

      $user->issues()->save($issue);
      $book->issues()->save($issue);
    });
  }

  public function updateIssue(Issue $issue, string $actionType): void
  {
    try{
      $this->checkIssueAction($issue, $actionType);

      DB::transaction(function () use ($issue, $actionType) {
        if($actionType === IssueActionTypeEnums::Issue->value) {
          $issue['issued_at'] = date('Y-m-d');
        }

        if($actionType === IssueActionTypeEnums::Return->value) {
          $issue['returned_at'] = date('Y-m-d');

          $issue->book->stock += 1;
          $issue->book->save();
        }

        $issue->save();
      });
    } catch (IssueException $e) {
      throw new IssueException($e->getMessage());
    }
  }

  private function checkIssueAction(Issue $issue, string $actionType): void
  {
    switch ($actionType) {
      case IssueActionTypeEnums::Issue->value:
        if($issue->issued_at !== null || $issue->returned_at !== null) {
          throw new IssueException('Wrong action!');
        }
        break;

      case IssueActionTypeEnums::Return->value:
        if($issue->issued_at === null || $issue->returned_at !== null) {
          throw new IssueException('Wrong action!');
        }
        break;

      default:
        throw new IssueException('Wrong action!');
        break;
    }
  }

  private function calculateExpireDate(int $month): string
  {
    $currentDate = date('Y-m-d');

    $array = explode('-', $currentDate);
    $array[1] = $array[1] + $month;
    $expireDate = implode('-', $array);

    return $expireDate;
  }

  private function checkBookAlreadyRequested(User $user, Book $book): bool
  {
    $exist = false;

    foreach ($user->issues as $issue) {
      if($issue->book->title == $book->title && $issue->returned_at === null) {
        $exist = true;
        break;
      }
    }

    return $exist;
  }
}
